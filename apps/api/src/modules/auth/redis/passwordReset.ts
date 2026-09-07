import ms from "ms";

import { redis } from "@/shared/redis.js";
import { NotFoundError } from "@/shared/errors/NotFoundError.js";

const PASSWORD_RESET_TTL = ms("30min");

const userIdKey = (userId: string) => `password-reset:user:${userId}`;
const tokenKey = (tokenHash: string) => `password-reset:token:${tokenHash}`;

const storePasswordResetToken = async (tokenHash: string, userId: string) => {
  await redis
    .multi()
    .set(userIdKey(userId), tokenHash, { PX: PASSWORD_RESET_TTL })
    .set(tokenKey(tokenHash), userId, { PX: PASSWORD_RESET_TTL })
    .exec();
};

const consumePasswordResetToken = async (tokenHash: string) => {
  const userId = await redis.getDel(tokenKey(tokenHash));

  if (!userId) throw new NotFoundError("Invalid or expired reset token");

  const currentHash = await redis.get(userIdKey(userId));

  if (currentHash !== tokenHash) throw new NotFoundError("Invalid or expired reset token");

  await redis.del(userIdKey(userId));

  return userId;
};

export { storePasswordResetToken, consumePasswordResetToken };

/** DOCS :
 * Password-reset state is intentionally stored in Redis rather than PostgreSQL.
 *
 * Design decisions:
 * - Password-reset tokens are ephemeral security state, so Redis TTL is used
 *   for automatic expiration.
 * - The plaintext token is never stored; only its hash is used as the key.
 * - Every forgot-password request generates a new token.
 * - Only the latest token for a user is considered valid.
 * - Two mappings are maintained:
 *
 *     password-reset:user:{userId}      -> tokenHash
 *     password-reset:token:{tokenHash}  -> userId
 *
 *   The user -> token mapping identifies the currently active token, while
 *   the token -> user mapping allows the reset request to resolve the user.
 *
 * - MULTI/EXEC is used when creating the mappings so both writes are executed
 *   together without another Redis command being interleaved between them.
 * - Redis transactions do not provide rollback; this is used for atomic
 *   execution of the two Redis writes, not as a database-style transaction.
 *
 * Token validity is determined by two conditions:
 * 1. The token -> user mapping must exist. This ensures the token has not
 *    expired or already been consumed.
 * 2. The user -> token mapping must contain the same token hash. This ensures
 *    that an older token is rejected after a newer reset request replaces it.
 *
 * During consumption, GETDEL is used on the token -> user mapping. GETDEL is
 * atomic, so concurrent requests using the same token cannot both obtain the
 * userId. The first request consumes the token; subsequent requests receive
 * null and are rejected.
 *
 * The user -> token mapping is deleted only after the token is confirmed to
 * be the currently active token. Therefore, attempting to use an older token
 * cannot accidentally remove the mapping for the newer valid token.
 *
 * Redis is treated as disposable state here. Losing this data only invalidates
 * the reset flow; the user can request another reset token. The actual password
 * and account state remain durable in PostgreSQL.
 */

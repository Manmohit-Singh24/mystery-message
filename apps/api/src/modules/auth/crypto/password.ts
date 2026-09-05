import argon2 from "argon2";

const hashPassword = async (password: string) => {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 64 * 1024,
    timeCost: 3,
    parallelism: 1,
  });
};

const verifyPassword = async (password: string, hash: string) => {
  return argon2.verify(hash, password);
};

export { hashPassword, verifyPassword };

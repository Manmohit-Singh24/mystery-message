import { env } from "@/config/env.js";

import app from "./app.js";
import { logger } from "@/shared/logger.js";

app.listen(env.PORT, () => {
  logger.info(
    {
      port: env.PORT,
      env: env.NODE_ENV,
    },
    "Server started"
  );
});

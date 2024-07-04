import fastify from "fastify";
import { logger } from "./logger";

import "dotenv/config";

export default async function buildServer() {
  const app = fastify({
    logger,
  });

  app.register(import("@/plugins/auth"));
  app.register(import("@/routes/auth.routes"), { prefix: "/api/auth" });
  app.register(import("@/routes/vehicle.route"), { prefix: "/api" });

  return app;
}

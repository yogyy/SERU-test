import "@fastify/jwt";
import { JWTPayload } from "./types";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: JWTPayload;
    user: {
      sub: string;
      name: string;
      is_admin: boolean;
      iat: number;
      exp: number;
    };
  }
}

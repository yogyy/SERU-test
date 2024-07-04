import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { NoResultError } from "kysely";
import { db } from "@/db";
import { generateAccToken } from "@/lib/utils";

const userRoutes: FastifyPluginAsyncTypebox = async function (app) {
  app.post(
    "/login",
    { schema: { body: Type.Object({ name: Type.String() }) } },
    async (req, reply) => {
      try {
        const { name } = req.body;
        const user = await db
          .selectFrom("users")
          .where("name", "=", name)
          .select(["id", "name", "is_admin"])
          .executeTakeFirstOrThrow();

        const token = await generateAccToken(user, req.generateToken);

        reply.code(200).send({
          message: "Login successful",
          user: {
            id: user.id,
            name: user.name,
            is_admin: user.is_admin,
          },
          access_token: token,
        });
      } catch (err) {
        if (err instanceof NoResultError) {
          if (err.message === "no result") {
            return reply.code(404).send(new Error("User Not Found"));
          }
        } else {
          reply.code(500).send(err);
        }
      }
    }
  );
};

export default userRoutes;

import { db } from "@/db";
import {
  DeleteVehicleTypeReq,
  EditVehicleTypeReq,
  NewVehicleReq,
  VehicleByBrandIdReq,
  VehiclesReq,
} from "@/dto/vehicle.dto";
import { FastifyReply, FastifyRequest } from "fastify";
import { sql } from "kysely";

type Order = "id asc" | "id desc" | "name asc" | "name desc";

export async function getVehiclesHandler(
  req: FastifyRequest<{ Querystring: VehiclesReq }>,
  reply: FastifyReply
): Promise<void> {
  const { page, per_page, sort_by } = req.query;

  const order = sort_by.replace(/\./g, " ") as Order;

  try {
    const { rows } = await db.executeQuery(
      sql`SELECT COUNT(*) from vehicle_type;`.compile(db)
    );
    const total = rows as [{ count: string }];

    const vehicles = await db
      .selectFrom("vehicle_type")
      .orderBy(order)
      .selectAll()
      .offset((page - 1) * per_page)
      .limit(per_page)
      .execute();

    reply.code(200).send({
      data: vehicles,
      total: parseInt(total[0].count),
      page,
      per_page,
    });
  } catch (err) {
    reply.code(500).send(err);
  }
}

export async function getByBrandIdHandler(
  req: FastifyRequest<{ Querystring: VehicleByBrandIdReq }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const { brand_id } = req.query;

    const vehicle = await db
      .selectFrom("vehicle_type")
      .where("brand_id", "=", brand_id)
      .selectAll()
      .execute();

    if (vehicle.length === 0) {
      reply
        .code(404)
        .send(new Error(`vehicle type with brand_id ${brand_id} not found`));
    }

    reply.code(200).send(vehicle);
  } catch (err) {
    reply.code(500).send(err);
  }
}

export async function addVehicleTypeHandler(
  req: FastifyRequest<{ Body: NewVehicleReq }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const { name, brand_id } = req.body;
    const { is_admin } = req.user;

    if (!is_admin) {
      reply.code(403).send({
        error: "You do not have permission to perform this action.",
      });
      return;
    }

    const res = await db
      .insertInto("vehicle_type")
      .values({ name, brand_id })
      .returning(["id", "name", "brand_id"])
      .executeTakeFirstOrThrow();

    reply.code(200).send(res);
  } catch (err) {
    reply.code(500).send(err);
  }
}

export async function editVehicleTypeHandler(
  req: FastifyRequest<{ Body: EditVehicleTypeReq }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const { id, name } = req.body;
    const { is_admin } = req.user;

    if (!is_admin) {
      reply.code(403).send({
        error: "You do not have permission to perform this action.",
      });
      return;
    }

    const newData = await db
      .updateTable("vehicle_type")
      .set({ name })
      .where("id", "=", id)
      .returning(["id", "name", "brand_id"])
      .executeTakeFirst();

    reply.code(200).send({
      message: "update data success",
      data: newData,
    });
  } catch (err) {
    reply.code(500).send(err);
  }
}

export async function deleteVehicleTypeHandler(
  req: FastifyRequest<{ Body: DeleteVehicleTypeReq }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const { id } = req.body;
    const { is_admin } = req.user;

    if (!is_admin) {
      reply.code(403).send({
        error: "You do not have permission to perform this action.",
      });
      return;
    }

    await db.deleteFrom("vehicle_type").where("id", "=", id).executeTakeFirst();

    reply.code(204).send();
  } catch (err) {
    reply.code(500).send(err);
  }
}

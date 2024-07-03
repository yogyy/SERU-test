import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("users")
    .addUniqueConstraint("unique_user.name", ["name"])
    .execute();
}

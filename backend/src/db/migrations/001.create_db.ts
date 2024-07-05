import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(100)", (col) => col.unique().notNull())
    .addColumn("is_admin", "boolean", (col) => col.defaultTo(false).notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`current_timestamp`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`current_timestamp`).notNull()
    )
    .execute();

  await db.schema
    .createTable("vehicle_brand")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(100)", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`current_timestamp`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`current_timestamp`).notNull()
    )
    .execute();

  await db.schema
    .createTable("vehicle_type")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(100)", (col) => col.notNull())
    .addColumn("brand_id", "integer", (col) =>
      col.references("vehicle_brand.id")
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`current_timestamp`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`current_timestamp`).notNull()
    )
    .execute();

  await db.schema
    .createTable("vehicle_model")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(100)", (col) => col.notNull())
    .addColumn("type_id", "integer", (col) =>
      col.references("vehicle_type.id").notNull()
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`current_timestamp`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`current_timestamp`).notNull()
    )
    .execute();

  await db.schema
    .createTable("vehicle_year")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("year", "smallint", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`current_timestamp`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`current_timestamp`).notNull()
    )
    .execute();

  await db.schema
    .createTable("pricelist")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("code", "varchar(100)", (col) => col.notNull())
    .addColumn("price", "varchar(100)", (col) => col.notNull())
    .addColumn("year_id", "integer", (col) =>
      col.references("vehicle_year.id").notNull()
    )
    .addColumn("model_id", "integer", (col) =>
      col.references("vehicle_model.id").notNull()
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`current_timestamp`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`current_timestamp`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("users").execute();
  await db.schema.dropTable("pricelist").execute();
  await db.schema.dropTable("vehicle_year").execute();
  await db.schema.dropTable("vehicle_model").execute();
  await db.schema.dropTable("vehicle_type").execute();
  await db.schema.dropTable("vehicle_brand").execute();
}

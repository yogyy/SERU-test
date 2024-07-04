import type { ColumnType } from "kysely";
import { JWT } from "@fastify/jwt";

export type Timestamp = ColumnType<Date, Date | string, Date | string>;
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Pricelist {
  id: Generated<number>;
  price: string;
  code: string;
  model_id: number;
  year_id: number;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Users {
  id: number;
  name: string;
  is_admin: boolean;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface VehicleBrand {
  id: Generated<number>;
  name: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface VehicleModel {
  id: Generated<number>;
  name: string;
  type_id: number;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface VehicleType {
  id: Generated<number>;
  name: string;
  brand_id: number | null;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface VehicleYear {
  id: Generated<number>;
  year: number;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface DB {
  users: Users;
  vehicle_brand: VehicleBrand;
  vehicle_model: VehicleModel;
  vehicle_type: VehicleType;
  vehicle_year: VehicleYear;
  pricelist: Pricelist;
}

export interface JWTPayload {
  sub: ColumnType<number, number | undefined, number> | number | null;
  name: string;
  is_admin: boolean;
}

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
    generateToken(payload: JWTPayload): string;
  }
  export interface FastifyInstance {
    auth: any;
  }
}

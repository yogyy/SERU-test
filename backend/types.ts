import type { ColumnType, Generated } from "kysely";
import { JWT } from "@fastify/jwt";

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Pricelist {
  id: Generated<number>;
  price: string;
  code: string;
  model_id: Generated<number>;
  year_id: Generated<number>;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

export interface Users {
  id: Generated<number>;
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
  brand_id: Generated<number | null>;
  id: Generated<number>;
  name: string;
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
  sub: number | null;
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

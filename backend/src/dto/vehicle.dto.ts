import { Static, Type } from "@sinclair/typebox";

export const Vehicles = Type.Object({
  page: Type.Number({ minimum: 1, default: 1 }),
  per_page: Type.Number({ minimum: 1, default: 5 }),
  sort_by: Type.Union(
    [
      Type.Literal("id.asc"),
      Type.Literal("id.desc"),
      Type.Literal("name.asc"),
      Type.Literal("name.desc"),
    ],
    { default: "id.asc" }
  ),
});

export const VehicleByBrandId = Type.Object({
  brand_id: Type.Number({ minimum: 1 }),
});

export const NewVehicle = Type.Object({
  name: Type.String(),
  brand_id: Type.Optional(Type.Number({ minimum: 1 })),
});

export const EditVehicleType = Type.Object({
  id: Type.Number({ minimum: 1 }),
  name: Type.String(),
  brand_id: Type.Optional(Type.Number({ minimum: 1 })),
});

export const DeleteVehicleType = Type.Object({
  id: Type.Number({ minimum: 1 }),
});

export type VehiclesReq = Static<typeof Vehicles>;
export type VehicleByBrandIdReq = Static<typeof VehicleByBrandId>;
export type NewVehicleReq = Static<typeof NewVehicle>;
export type EditVehicleTypeReq = Static<typeof EditVehicleType>;
export type DeleteVehicleTypeReq = Static<typeof DeleteVehicleType>;

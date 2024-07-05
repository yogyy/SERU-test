import {
  addVehicleTypeHandler,
  deleteVehicleTypeHandler,
  editVehicleTypeHandler,
  getByBrandIdHandler,
  getVehiclesHandler,
} from "@/controllers/vehicle.controller";
import {
  DeleteVehicleType,
  EditVehicleType,
  NewVehicle,
  VehicleByBrandId,
  Vehicles,
} from "@/dto/vehicle.dto";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const vehicleRoutes: FastifyPluginAsyncTypebox = async function (app, _) {
  app.get(
    "/vehicles",
    { onRequest: [app.auth], schema: { querystring: Vehicles } },
    getVehiclesHandler
  );
  app.get(
    "/vehicle-types",
    { onRequest: [app.auth], schema: { querystring: VehicleByBrandId } },
    getByBrandIdHandler
  );

  app.post(
    "/vehicle-type",
    {
      onRequest: [app.auth],
      schema: { body: NewVehicle },
    },
    addVehicleTypeHandler
  );

  app.patch(
    "/vehicle-type",
    { onRequest: [app.auth], schema: { body: EditVehicleType } },
    editVehicleTypeHandler
  );

  app.delete(
    "/vehicle-type",
    { onRequest: [app.auth], schema: { body: DeleteVehicleType } },
    deleteVehicleTypeHandler
  );
};

export default vehicleRoutes;

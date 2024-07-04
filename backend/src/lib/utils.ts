import { JWTPayload, Users } from "~/types";

export const generateAccToken = async (
  user: Omit<Users, "created_at" | "updated_at">,
  generateToken: (payload: JWTPayload) => string
) => {
  return generateToken({
    sub: user.id,
    name: user.name,
    is_admin: user.is_admin,
  });
};

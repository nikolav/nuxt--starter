import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

import { JWT } from "@/config/vars";

export const withTokens = async (user: User) => {
  const payload = { id: user.id };
  const token = await jwt.sign(payload, JWT.secret, { expiresIn: JWT.expire });
  const refreshToken = await jwt.sign(payload, JWT.secretRefresh, {
    expiresIn: JWT.expireRefresh,
  });
  return { user, token, refreshToken };
};

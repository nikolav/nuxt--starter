import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

import { JWT } from "@/config/vars";

export const withTokens = (user: User) => {
  const payload = { id: user.id };
  const token = jwt.sign(payload, JWT.secret, { expiresIn: JWT.expire });
  const refreshToken = jwt.sign(payload, JWT.secretRefresh, {
    expiresIn: JWT.expireRefresh,
  });
  return { user, token, refreshToken };
};

export const jwtVerify = (token: string) => jwt.verify(token, JWT.secret);

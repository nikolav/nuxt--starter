import bcryptjs from "bcryptjs";
import {
  withTokens,
  userExists,
  userAdd,
  userFindByEmail,
} from "@/services";

const { compare } = bcryptjs;

export const register = async (email: string, password: string) => {
  if (await userExists(email)) throw `bad request`;
  return withTokens(await userAdd(email, password));
};
export const authenticate = async (email: string, password: string) => {
  const user = await userFindByEmail(email);
  if (!user || !(await compare(password, user.passwordHash)))
    throw `bad request`;
  return withTokens(user);
};
export const logout = async () => {};

export const sendMailPasswordReset = async () => {};
export const passwordReset = async () => {};

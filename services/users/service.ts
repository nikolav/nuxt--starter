import { prisma, PrismaClient } from "@/services";
import bcryptjs from "bcryptjs";

import { BCRYPT_HASH_ROUNDS } from "@/config/vars";
const { hash } = bcryptjs;

export const userFindByEmail = async (email: string) => {
  const client = (await prisma) as PrismaClient;
  return client.user.findUnique({ where: { email } });
};
export const userExists = async (email: string) => {
  try {
    return null != (await userFindByEmail(email));
  } catch (error) {}
  return false;
};
export const userAdd = async (email: string, password: string) => {
  const client = (await prisma) as PrismaClient;
  const passwordHash = await hash(password, BCRYPT_HASH_ROUNDS);
  return await client.user.create({ data: { email, passwordHash } });
};

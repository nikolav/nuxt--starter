import { prisma, PrismaClient, User } from "@/services";
import bcryptjs from "bcryptjs";

import { BCRYPT_HASH_ROUNDS } from "@/config/vars";
import { map } from "@/utils";

const { hash } = bcryptjs;

export const userFindById = async (id: string) => {
  const client = (await prisma) as PrismaClient;
  return await client.user.findUnique({ where: { id } });
};

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

export const rolesByUser = async ({ id }: User) => {
  try {
    const client = (await prisma) as PrismaClient;
    return map(
      await client.role.findMany({
        where: {
          users: {
            some: {
              user: {
                id,
              },
            },
          },
        },
        select: { type: true },
      }),
      "type"
    );
  } catch (error) {}
  return [];
};

export const matchesRoles = async (user: User, ...roles: string[]) => {
  if (0 === roles.length) return true;
  try {
    const userRoles = await rolesByUser(user);
    return roles.every((role) => userRoles.includes(role));
  } catch (error) {}
  return false;
};

export const usersByRole = async (role: string) => {
  try {
    const client = (await prisma) as PrismaClient;
    return await client.user.findMany({
      where: {
        roles: {
          some: {
            role: {
              type: role,
            },
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
  return [];
};

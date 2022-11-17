import { PrismaClient } from "@prisma/client";
import { OrNull } from "@/types";

export type TOrPrismaClient = OrNull<PrismaClient>;

let client: TOrPrismaClient = null;

export * from "@prisma/client";
export const prisma = new Promise((resolve) => {
  if (client) return resolve(client);
  try {
    client = new PrismaClient();
  } catch (error) {
    console.error(error);
  }

  resolve(client);
});


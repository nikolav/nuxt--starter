import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const { hashSync } = bcrypt;

; (async () => {

  const client = new PrismaClient();

  const userAdmin = {
    email: "admin@nikolav.rs",
    passwordHash: hashSync("122333", 1)
  };
  const roleAdmin = {
    type: "admin"
  };

  const testRow = await client.main.upsert({
    where: { name: "test" },
    create: { name: "test", value: "test" },
    update: { value: "test" },
  })

  const user = await client.user.upsert({
    where: { email: userAdmin.email },
    update: userAdmin,
    create: userAdmin
  });
  const role = await client.role.upsert({
    where: roleAdmin,
    create: roleAdmin,
    update: roleAdmin,
  });

  const roleAdminOnUser =
    await client.rolesOnUsers.upsert({
      where: { userId_roleId: { userId: user.id, roleId: role.id } },
      update: { userId: user.id, roleId: role.id },
      create: { userId: user.id, roleId: role.id },
    })

  console.log({ testRow, user, role, roleAdminOnUser });
})();

import chalk from 'chalk';
import { faker } from '@faker-js/faker';
import bcryptjs from "bcryptjs";

import { PrismaClient } from "@prisma/client";
import range from "lodash/range.js"
import map from "lodash/map.js"
import clamp from "lodash/clamp.js"


const testId = () => String(Math.random());
const MAX_DBSEED_COUNT = 20;
const { hashSync } = bcryptjs;


export default (dbCmdSeed) => {

  dbCmdSeed
    .command("users")
    .description("seeds users collection")
    .argument("[count]", "add random users to db", 1)
    .action(async (count = 1) => {
      const c = clamp(count, 0, MAX_DBSEED_COUNT);
      if (!(0 < c)) return;

      const client = new PrismaClient();

      await client.user.createMany({
        data: map(range(c), () => ({
          email: faker.internet.email(),
          passwordHash: hashSync("122333", 1),
        })),
      });

      console.log(chalk.green(`@users collection seeded, [${c}] added`));
    });

  dbCmdSeed
    .command("main")
    .description("seeds main table")
    .argument("[count]", "add random vars to db", 1)
    .action(async (count = 1) => {
      const c = clamp(count, 0, MAX_DBSEED_COUNT);
      if (!(0 < c)) return;

      const client = new PrismaClient();

      await client.main.createMany({
        data: map(range(c), () => ({
          name: `x.${testId()}`,
          value: testId(),
        })),
      });

      console.log(chalk.green(`@main collection seeded, [${c}] added`));
    });
};

import chalk from 'chalk';
import { PrismaClient } from "@prisma/client";

export default (dbCmdList) => {
  
  dbCmdList
    .command("users")
    .description("show users collection")
    .action(async () => {
      const client = new PrismaClient();
      const users = await client.user.findMany();

      console.log(chalk.green(`@users collection`));
      console.log(users);
    });

  dbCmdList
    .command("main")
    .description("show main collection")
    .action(async () => {
      const client = new PrismaClient();
      const vars = await client.main.findMany();

      console.log(chalk.green(`@main collection`));
      console.log(vars);
    });

};

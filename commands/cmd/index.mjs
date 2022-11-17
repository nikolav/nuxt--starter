import configureDbSeed from "./db-seed.mjs";
import configureDbList from "./db-list.mjs";

export default (program) => {
  const dbCmd = program.command("db");
  const dbCmdSeed = dbCmd.command("seed");
  const dbCmdList = dbCmd.command("list");

  configureDbSeed(dbCmdSeed);
  configureDbList(dbCmdList);
};

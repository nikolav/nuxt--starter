import { Command } from "commander";
import chalk from "chalk";

import configureCommands from "./cmd/index.mjs";

// https://github.com/tj/commander.js
// https://github.com/tj/commander.js/tree/master/examples
const program = new Command();

program
  .name("nuxtapp-commands")
  .description("nuxtapp cli utilities")
  .version("0.0.0")
  .configureHelp({
    // sortSubcommands: true,
    subcommandTerm: (cmd) => cmd.name(),
  })
  .configureOutput({
    // Output errors in red.
    outputError: (str, write) => write(chalk.red.bold(str)),
  });

// declare commands
configureCommands(program);

// declare common options for *commands
program.commands.forEach((cmd) => {
  cmd.option("-d, --debug");
  cmd.option("-v, --verbose");
});

program.parse();

export {};

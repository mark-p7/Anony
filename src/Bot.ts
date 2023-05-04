import { Client, ApplicationCommandDataResolvable } from "discord.js";
import "dotenv/config";
import { Commands } from "./Commands/SlashCommands/Commands";
import { interactionHandler } from "./Commands/SlashCommands/handleSlashCommand";

const token = process.env.DISCORD_SECRET_TOKEN;

const client = new Client({
  intents: [],
});

client.on("ready", () => {
  if (!client.user || !client.application) {
    return;
  }

  for (const command of Commands) {
    client.application?.commands.create(command);
  }
  interactionHandler(client);
  console.log(`${client.user.username} is online`);
});

client.login(token);

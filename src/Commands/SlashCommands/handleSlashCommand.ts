import { Client, CommandInteraction, Interaction, Events } from "discord.js";
import { Commands } from "./Commands";
import { setTimeout } from "timers/promises";

export const interactionHandler = (client: Client): void => {
  client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    if (interaction.isChatInputCommand() || interaction.isCommand()) {
      await handleSlashCommand(client, interaction);
    }
  });
};

export const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);
  if (!slashCommand) {
    await interaction.reply({
      content: "An error has occurred",
      ephemeral: true,
    });
    return;
  } else {
    await interaction.deferReply({ ephemeral: true });
    await wait(4);
    slashCommand.run(client, interaction);
  }
};

const wait = async (seconds: number) => {
  await setTimeout(seconds * 1000);
};

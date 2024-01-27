import { Client, CommandInteraction, Interaction, Events } from "discord.js";
import { Commands } from "./Commands";

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
  
  // Find the command that was ran
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);

  // If the command doesn't exist, return
  if (!slashCommand) {
    await interaction.reply({
      content: "An error has occurred",
      ephemeral: true,
    });
    return;
  }

  // If the command does exist, defer the reply and run the command
  await interaction.deferReply({ ephemeral: true });
  slashCommand.run(client, interaction);
};
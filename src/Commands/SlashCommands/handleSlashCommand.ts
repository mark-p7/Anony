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
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);
  if (!slashCommand) {
    await interaction.followUp({
      content: "An error has occurred",
      ephemeral: true,
    });
    return;
  } else {
    slashCommand.run(client, interaction);
  }
};

import {
  Client,
  CommandInteraction,
  Interaction,
  Events,
  InteractionResponse,
} from "discord.js";
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

  // Defer pending reply
  const pendingReply: InteractionResponse<boolean> =
    await interaction.deferReply({ ephemeral: true });

  try {
    // Run the command
    await slashCommand.run(client, interaction);

    // Delete pending reply after command is finished running
    pendingReply.delete();
  } catch (error) {
    // Log error
    console.log(error);

    // Set error message
    let message: string = "An error has occured";
    if (error instanceof Error) message = error.message;

    // Send error message
    pendingReply.edit({
      content: message,
    });
  }
};

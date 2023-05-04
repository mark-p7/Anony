import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  TextChannel,
  TextBasedChannel,
  ApplicationCommandStringOptionData,
} from "discord.js";
import { Command } from "@/Types/CommandTypes";

export const SendCommand: Command = {
  name: "anon",
  description: "Send an anonymous message",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "message",
      description: "The anonymous message you want to send",
      type: 3,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    if (!interaction.isCommand()) return;
    const channelId: string = interaction.channelId;
    const content = interaction.options.get("message")?.value;
    const channel = await client.channels.fetch(channelId);
    if(interaction.replied) return;
    if (typeof content === "string" && channel) {
      await (channel as TextChannel).send(content);
      await interaction.reply({
        content: "Message sent",
        ephemeral: true,
      });
      return;
    } else {
      await interaction.reply({
        content: "An error has occurred",
        ephemeral: true,
      });
      return;
    }
  },
};

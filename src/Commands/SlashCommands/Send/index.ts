import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  TextChannel,
  Message,
} from "discord.js";
import { Command } from "@/Types/CommandTypes";
import { Profanity, ProfanityOptions } from "@2toad/profanity";
import { CensorType } from "@2toad/profanity/dist/models";

const profanityOptions: ProfanityOptions = {
  wholeWord: false,
  grawlix: "\\*\\*\\*\\*\\*",
  grawlixChar: "\\*",
};

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
    const profanity = new Profanity(profanityOptions);

    if (typeof content === "string" && channel) {
      // Filter word and log it
      const wordSent = profanity.censor(content, CensorType.AllVowels);
      console.log(wordSent);

      // Send the message through the bot
      const message: Message<true> = await (channel as TextChannel).send(
        wordSent
      );

      // Notify the user that the message has been sent
      const returnString =
        `Message has been sent | ` +
        `Content: ${message.content} | ` +
        `Id: ${message.id} | ` +
        `https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`;

      await interaction.editReply({
        content: returnString,
      });
    } else {
      await interaction.editReply({
        content: "An error has occurred",
      });
    }
  },
};

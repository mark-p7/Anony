import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  TextChannel,
} from "discord.js";
import { Command } from "@/Types/CommandTypes";
import { Profanity, ProfanityOptions } from "@2toad/profanity";
import { CensorType } from "@2toad/profanity/dist/models";

const profanityOptions: ProfanityOptions = {
  wholeWord: false,
  grawlix: "\\*\\*\\*\\*\\*",
  grawlixChar: "\\*",
};

const profanity: Profanity = new Profanity(profanityOptions);

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

    // Get the channel and message content
    const channelId: string = interaction.channelId;
    const content = interaction.options.get("message")?.value;
    const channel = await client.channels.fetch(channelId);

    // Check if the message is a string and if the channel exists
    if (typeof content !== "string" || !channel)
      throw new Error("An error has occurred");

    // Check if the message is too long
    if (content.length > 2000) throw new Error("Message is too long");

    // Filter word and send it
    const wordSent = profanity.censor(content, CensorType.AllVowels);
    await (channel as TextChannel).send(wordSent);
  },
};

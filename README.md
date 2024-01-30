# Anon.y Discord Bot

Anon.y is a Discord bot built in TypeScript that allows users to send anonymous messages to Discord servers. This README file provides instructions on how to set up and run the bot, as well as an overview of the bot's features and architecture.

***[Invite Anon.y to your discord server now!](https://discord.com/api/oauth2/authorize?client_id=1098515972396167178&permissions=380104674304&scope=bot%20applications.commands)***

## Features

Anon.y provides the following features:

- Allow users to send anonymous messages to any server the bot is added to

Upcoming features:

- The bot automatically deletes messages after a set period of time to ensure privacy
- The bot uses unique message IDs to ensure that users can only delete their own messages
- The bot uses a custom command prefix that can be easily changed
- The bot supports multiple languages

## Basic bot permissions

Just like any other bot, Anon.y needs some basic discord permissions to function properly:

- Read Messages/View Channels
- Read Message History
- Send Messages
- Send Messages in Threads
- Use Slash Commands
- Create Public Threads
- Create Private Threads
- applications.commands

## Installation and Setup

To install and set up Anon.y, follow these steps:

1. Clone the repository from GitHub
2. Install dependencies by running `npm install`
3. Create a `.env` file with the following environment variables:

   ```
   DISCORD_SECRET_TOKEN=<your Discord bot token>
   BOT_PREFIX=!anon
   ```
   
   - `DISCORD_SECRET_TOKEN` is the token for your Discord bot. You can obtain this token from the Discord Developer Portal.
   - `BOT_PREFIX` is the command prefix for the bot. This can be changed to any prefix of your choosing.

4. Start the bot by running `npm run dev`

## Usage

To use Anon.y, users can send messages in the following format:

```
/anon <message>
```

- `message` is the message that the user wishes to send anonymously

For example:

```
/anon This is an anonymous message.
```

The bot will send the message to the specified channel, and the bot will notify the user that the message was sent

## Screenshots
Finding the slash command
![Alt text](<static/Screenshot 2024-01-30 at 10.12.35 AM.png>)
Sending the slash command
![Alt text](<static/Screenshot 2024-01-30 at 10.14.14 AM.png>)
Bot is computing the response
![Alt text](<static/Screenshot 2024-01-30 at 10.14.27 AM.png>)
Bot has successfully sent the message anonymously
![Alt text](<static/Screenshot 2024-01-30 at 10.16.01 AM.png>)

## !! Upcoming !!

To delete an anonymous message that you have sent, use the following command:

```
/anondelete <message ID>
```

- `message ID` is the unique ID assigned to the anonymous message when it was sent

For example:

```
/anondelete 123123123123
```

## Architecture

Anon.y is built using the following technologies:

- TypeScript for code organization and type safety
- Discord.js library for interacting with the Discord API
- dotenv library for loading environment variables from a `.env` file

The bot follows a simple architecture where messages are sent to Discord channels by calling the `discord.js` API, and anonymous messages are not currently stored on a database. In the near future, the bot will use unique message IDs to allow users to delete their own messages, and messages are automatically deleted after a set period of time to ensure privacy.

## Contributing

If you wish to contribute to Anon.y, feel free to fork the repository and submit a pull request. All contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/mark-p7/Anony/blob/main/LICENSE) file for details.

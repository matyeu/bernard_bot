<img width="150" height="150" align="left" style="float: left; margin: 0 10px 0 0;" alt="Bernard" src="https://cdn.discordapp.com/attachments/937724360725254154/983073875434831872/IMG_1553.JPG">

# BERNARD

[![](https://img.shields.io/discord/983056621716512910.svg?logo=discord&colorB=7289DA)](https://discord.gg/xNSKAkrPUg)
[![](https://img.shields.io/badge/discord.js-v13.0.0-blue.svg?logo=npm)](https://discord.js.org/)
[![](https://img.shields.io/badge/nodejs-16.6.0-green.svg)](https://www.nodejs.org)


<br>

![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)

**Bernard** has all the tools you will need for your Discord server,<br>
**Bernard** is a multi-function Discord bot developped by [matyeu](https://discord.com/users/916444775861850175). You can invite the hosted version [here](https://discord.com/api/oauth2/authorize?client_id=983074050010144819&permissions=8&scope=bot%20applications.commands)

## Commands

### Administration

| Name          | Description                              | Sub-commands   | Usage                 | Cd     |
| ------------- | ---------------------------------------- | -------------- | --------------------- | ------ |
| antibot       | Allow or Deny the addition of bot.       | none           | none                  | 10secs |
| coins         | Add or remove money from account.        | add, remove    | \<action> \<value>    | 5secs  |

### Informations

| Name          | Description                          | Sub-commands                | Usage                 | Cd     |
| ------------- | ------------------------------------ | --------------------------- | --------------------- | ------ |
| help          | Command help.                        | none                        | none                  | 10secs |
| info          | Send informations.                   | user, bot, server, channel  | \<action> \<value>    | 10secs |
| members       | Displays the number of members.      | none                        | none                  | 10secs |
| ping          | Ping the bot.                        | none                        | none                  | 10secs |

### Community

| Name          | Description                              | Sub-commands   | Usage                 | Cd     |
| ------------- | ---------------------------------------- | -------------- | --------------------- | ------ |
| afk           | Put yourself in afk mode.                | none           | (value)               | 10secs |
| avatar        | Displays a user's avatar.                | none           | \<user> (picture)     | 10secs |
| balance       | Show the balance of the user.            | none           | \<user>               | 10secs |
| bugreport     | Send a bug to the support server.        | none           | none                  | 10secs |
| suggestion    | Send a suggestion to the support server. | none           | none                  | 10secs |
### Fun

| Name          | Description                              | Sub-commands   | Usage                 | Cd     |
| ------------- | ---------------------------------------- | -------------- | --------------------- | ------ |
| morpion       | Allows you to play morpion.                | none         | none                  | 10secs |

### Roleplay
| Name          | Description                                               | Sub-commands   | Usage                           | Cd      |
| ------------- | --------------------------------------------------------- | -------------- | ------------------------------- | ------- |
| balance       | Displays or add or remove the balance of a user.          | none           | \<action> (username) (montant)  | 10secs  |
| equipment     | Display your or a user's equipment.                       | none           | \<username>                     | 10secs  |
| farm          | The farm command allows you to fish, hunt, gather etc.    | none           | \<choice>                       | 2m5secs |
| start         | Allows you to start the RPG adventure.                    | none           | none                            | 10secs  |

### Casino
| Name          | Description                              | Sub-commands   | Usage                 | Cd     |
| ------------- | ---------------------------------------- | -------------- | --------------------- | ------ |
| crash         | Allows you to play crash.                | none           | \<bet>                | 10secs |
| rps           | Allows you to play rps.                  | none           | \<bet>                | 10secs |

### Moderation

| Name          | Description                      | Sub-commands     | Usage                    | Cd     |
| ------------- | -------------------------------- | ---------------- | ------------------------ | ------ |
| ban           | Ban or unban a user.             |none              | \<user> \<reason> (time) | 1sec   |
| kick          | Kick a user.                     |none              | \<user> \<reason>        | 1sec   |
| lock          | Lock or unlock a channel.        |none              | <\state>                 | 1sec   |
| mute          | Mute or unmute a user.           |none              | \<user> \<reason> (time) | 1sec   |
| peace         | Lock a channel for 1 minute.     |none              | none                     | 1sec   |
| purge         | Delete messages.                 |messages, user    | \<action> (value)        | 1sec   |
| warn          | Warn or unwarn a user.           |user, server      | \<action> (value)        | 1sec   |


## A powerful Dashboard

Bernard has its own dashboard which also offers many features! The dashboard runs with Express and EJS!

*Coming soon... 👀*

## Configuration

1. Clone the repo
2. Clone `env.template.txt` into the main directory and rename it to `.env`
3. Install the dependencies: `npm install`
4. Compile the script: `npm run build`
5. Start the bot: `npm run start`

## Développement

* [Typescript](#) - Typescript
* [Ejs](#) - Ejs
* [Discord.js](https://discord.js.org) - Discord.js
* [Mongoose](https://mongodb.com) - Mongoose

## Versions
* **Latest stable release:** 1.0.0
* **Latest release:** 1.0.0

## Contributions/Licence

This project has an MIT license. And you are welcome to contribue. To contribute, please open a pull request on dev branch.

## Useful links

* [Github of site](https://github.com/matyeu/bernard_site)
* [Bot invitation link](https://discord.com/api/oauth2/authorize?client_id=983074050010144819&permissions=8&scope=bot%20applications.commands)
* [Discord invitation link](https://discord.gg/xNSKAkrPUg)



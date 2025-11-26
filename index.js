import 'dotenv/config'
import Discord from "discord.js";
import { createRequire } from 'module'
import * as youtube_cmds from "./command_actions/youtube_cmds.js"
import * as general_cmds from "./command_actions/general_cmds.js"
import * as ai_cmds from "./command_actions/ai_cmds.js"

const require = createRequire(import.meta.url);
const config = require("./config.json");
const token = process.env.DISCORD_TOKEN;
const client = new Discord.Client();

const queue = new Map();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("message", (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(config.prefix)) return;

  //#region General Commands
  if (msg.content ===`${config.prefix}hi`) {
    general_cmds.hello_greeting(msg);
    return;
  }
  if (msg.content.startsWith === `${config.prefix}image`) {
    general_cmds.image_greeting(msg, storage)
    return;
  }
  //#endregion

  //#region Youtube Commands
  const serverQueue = queue.get(msg.guild.id);
  if (msg.content.startsWith(`${config.prefix}play`)) {
    youtube_cmds.execute(msg, queue, serverQueue);
    return;
  } else if (msg.content.startsWith(`${config.prefix}skip`)) {
    youtube_cmds.skip(msg, serverQueue);
    return;
  } else if (msg.content.startsWith(`${config.prefix}stop`)) {
    youtube_cmds.stop(msg, serverQueue);
    return;
  } else if (msg.content.startsWith(`${config.prefix}queue`)) {
    youtube_cmds.print_queue(msg, serverQueue);
    return;    
  }
  //#endregion

  //#region AI Commands
  if (msg.content.startsWith(`${config.prefix}ai`)) {
    var request = msg.content.slice(`${config.prefix}ai`.length).trim();
    ai_cmds.send_request(request).then(response => {
      msg.channel.send(response);
    }).catch(error => {
      console.error('Error:', error);
      msg.channel.send("There was an error processing your request.");
    });
    return;
  }
  //#endregion

  msg.channel.send("You need to enter a valid command!");
});

client.login(`${token}`);

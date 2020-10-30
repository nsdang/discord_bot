import Discord from "discord.js";
import {execute, skip, stop, print_queue} from "./command_actions/music.js";
import { createRequire } from 'module'
import {new_mem_greeting, hello_greeting, image_greeting} from "./command_actions/server_greeting.js"


const require = createRequire(import.meta.url);
const config = require("./config.json");
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
  
  if (msg.content ===`${config.prefix}hello`) {
    msg.reply("hello onichan!");
  }

  if (msg.content.startsWith === `${config.prefix}image`) {
    image_greeting(msg, storage)
    return;
  }

  const serverQueue = queue.get(msg.guild.id);

  if (msg.content.startsWith(`${config.prefix}play`)) {
    execute(msg, queue, serverQueue);
    return;
  } else if (msg.content.startsWith(`${config.prefix}skip`)) {
    skip(msg, serverQueue);
    return;
  } else if (msg.content.startsWith(`${config.prefix}stop`)) {
    stop(msg, serverQueue);
    return;
  } else if (msg.content.startsWith(`${config.prefix}queue`)) {
    print_queue(msg, serverQueue);
    return;    
  } else {
    msg.channel.send("You need to enter a valid command!");
  }
});

client.login(`${config.token}`);

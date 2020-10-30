import Discord from "discord.js";
import {execute, skip, stop, print_queue} from "./command_actions/music.js";
import { createRequire } from 'module'

const require = createRequire(import.meta.url);
const config = require("./config.json");
const client = new Discord.Client();

const queue = new Map();
var servers = {};

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
  if (msg.content === "hello fun4ever") {
    msg.reply("hello onichan!");
  }

  if (msg.author.bot) return;
  if (!msg.content.startsWith(config.prefix)) return;

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

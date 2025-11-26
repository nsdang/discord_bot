/**
 * A bot that welcomes new guild members when they join
 */

function new_mem_greeting(member) {
  // Send the message to a designated channel on a server:
const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
// Do nothing if the channel wasn't found on this server
if (!channel) return;
// Send the message, mentioning the member
channel.send(`Welcome to the server, ${member}`);
}

function hello_greeting(msg){

}

function image_greeting(msg, storage){
const args = msg.content.split(" ");
if (!args[1]) return msg.channel.send("Please provide a name");

var pathReference = storage.ref(`discord-homies/${args[1]}`);

console.log (pathReference);

const embed = new Discord.MessageEmbed()
    .setColor(0xff0000)
    .setImage("https://i.imgur.com/wSTFkRM.png")
    .setFooter("Some note here");
  // Send the embed to the same channel as the message
msg.channel.send(embed);
}

export {new_mem_greeting, hello_greeting, image_greeting};

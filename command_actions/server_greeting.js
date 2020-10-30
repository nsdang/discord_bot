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
  
export {new_mem_greeting};
  
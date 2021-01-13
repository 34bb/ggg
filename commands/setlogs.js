const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms');
const { truncate } = require("fs");
module.exports = {
    name: "setlogs",
    description: "set guild anit raid config",
    run: async (client, message, args) => {
        const guildicon = message.guild.iconURL();
if(message.author.id === "347405583789457408") {
    
  let logs = message.mentions.channels.first();
  if(!logs) {
  let logsembed = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Please Mention an vaild channel`)
  .setFooter(message.guild.name, guildicon)
return message.channel.send(logsembed);
}
db.set(`acitonslogs_${message.guild.id}`, logs.id)
let done = new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.displayAvatarURL())
.setDescription(`well done aciton-logs channel has been set to ${logs}`)
.setFooter(message.guild.name, guildicon)
return message.channel.send(done)

   } 
      message.channel.send(`Only ownership of the guild can use that cmd!`)

}}

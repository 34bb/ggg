const Discord = require("discord.js")
const db = require("quick.db")
const ms = require('parse-ms')
const fs = require('fs')
const yaml = require("js-yaml");
const { mainprefix , token , status , dpunishment } = yaml.load(fs.readFileSync("./config.yml"));


module.exports = {
    name: "help",
    description: "Show Commands",
    run: async (client, message, args) => {
        let guildicon = message.guild.iconURL()
   
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag,message.author.displayAvatarURL())
        .setDescription(`
        ** Commands Protection**
        ${mainprefix}setlogs <#channel>
        ${mainprefix}add-owner @Mention
        ${mainprefix}owner-list
        ${mainprefix}remove-owner @Mention        
        ${mainprefix}add-admin @Mention
        ${mainprefix}admin-list
        ${mainprefix}remove-admin @Mention
        ${mainprefix}add-role
        ${mainprefix}remove-role
        ${mainprefix}setlogs-role <#channel>
     `)
 .setFooter(message.guild.name, guildicon)
          return message.channel.send(embed);

}}

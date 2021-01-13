const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms');
const { truncate } = require("fs");
const fs = require("fs");
module.exports = {
    name: "add-admin",
    description: "set guild anit raid config",
    run: async (client, message, args) => {
const guildicon = message.guild.iconURL();
if(message.author.id === "347405583789457408") {
    
        let user = message.mentions.users.first()
        if(!user) {
            let usermention = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(`
            **Mention User!** 
            `)
            .setFooter(message.guild.name, guildicon)
    
            return message.channel.send(usermention)
        }
        let adminusers = db.get(`adminusers_${message.guild.id}`)
        if(adminusers && adminusers.find(find => find.user == user.id)) {
        return message.channel.send(`This User It's Already on whitelist`)
        }
let data = {
    user: user.id
}
        db.push(`adminusers_${message.guild.id}`, data)
        let added = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(`
        **Added ${user} To  whiteList!** 
        `)
        .setFooter(message.guild.name, guildicon)

        return message.channel.send(added);
    }
message.channel.send(`Only ownership of the guild can use that cmd!`)
}}
 

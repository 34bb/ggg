console.log("\nLoading...")
console.log("If This Take Too long make sure u have add right token!")
const fs = require('fs')
const yaml = require("js-yaml");
const { mainprefix , token , status , dpunishment } = yaml.load(fs.readFileSync("./config.yml"));
const Discord = require('discord.js')
const client = new Discord.Client();
const db = require('quick.db')
const { join } = require('path');
const { readdirSync } = require('fs');
const prefix = mainprefix
client.commands= new Discord.Collection();
client.login(token)

  
client.on('ready', () => {
    client.user.setActivity(status, { type: 'PLAYING' });
    console.clear();
 
  console.log('\n\x1b[32m%s\x1b[0m', `          $[INFO]: Logged on ${client.user.tag}`);  
  console.log('\x1b[32m%s\x1b[0m', `           $[INFO]: PREFIX ${mainprefix}`);  
   console.log('\x1b[31m%s\x1b[0m', `            $[CREDITS]: Made By Rayan`);  

 });

 const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

 for (const file of commandFiles) {
     const command = require(join(__dirname, "commands", `${file}`));
     client.commands.set(command.name , command);
 }
 
 client.on("message", async message => {
    let prefix = await db.get(`prefix_${message.guild.id}`);
   if(prefix === null) prefix = mainprefix;
       if(message.author.bot) return;
       if(message.channel.type === 'dm') return;
   
       if(message.content.startsWith(prefix)) {
           
      let premiumcheck = db.get(`blacklisted`)

      if(premiumcheck && premiumcheck.find(find => find.kid == message.author.id)) return message.channel.send(`you cant use the bot your blacklisted!!`);
 
           const args = message.content.slice(prefix.length).trim().split(/ +/);
   
           const command = args.shift().toLowerCase();
   
           if(!client.commands.has(command)) return;
   
   
           try {
               client.commands.get(command).run(client, message, args);
   
           } catch (error){
               console.error(error);
           }
        }
   })


     
   client.on("roleCreate", async role => {
    const user = await role.guild.fetchAuditLogs({
        type: 'ROLE_CREATE'
    }).then(audit => audit.entries.first())
    const entry = user.executor
    let trustedusers = db.get(`trustedusers_${role.guild.id}`)
    if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
    return console.log('Its Trusted User');
    }
     role.delete("ProtectionRole Create..");
         let logs = db.get(`acitonslogs_${role.guild.id}`)

       client.channels.cache.get(logs).send(`<@${entry.id}> Is **Creating Role**.. [**Delete Role**]`)

});

client.on("webhookUpdate", async chan => {
  const webhooks = await chan.guild.fetchWebhooks();
  const myWebhooks = webhooks.filter(webhook => webhook.delete());
 });
client.on("roleDelete", async role => {
    const user = await role.guild.fetchAuditLogs({
        type: 'ROLE_DELETE'
    }).then(audit => audit.entries.first())
    const entry = user.executor
    let trustedusers = db.get(`trustedusers_${role.guild.id}`)
    if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
    return console.log('Its Trusted User');
    }
  let mention = role.mentionable; //Silinen rolü yeniden açma (eski ayarlarıyla)
  let hoist = role.hoist;
  let color = role.hexColor;
  let name = role.name;
  let perms = role.permissions;
  let position = role.position;
  role.guild.roles.create({
    name: name,
    color: color,
    hoist: hoist,
    position: position,
    permissions: perms,
    mentionable: mention
  })         
let logs = db.get(`acitonslogs_${role.guild.id}`)

       client.channels.cache.get(logs).send(`<@${entry.id}> Is **Deleteing Role**.. [**Create Role**]`)

});





client.on("channelCreate", async channel => {
    const user = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_CREATE'
    }).then(audit => audit.entries.first())
    const entry = user.executor 
    let trustedusers = db.get(`trustedusers_${channel.guild.id}`)
    if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
    return console.log('Its Trusted User');
    }
     channel.delete("ProtectionChannel Create..");
let logs = db.get(`acitonslogs_${channel.guild.id}`)
client.channels.cache.get(logs).send(`<@${entry.id}> Is **Creating Channel**.. [**Delete Channel**]`)
});        

client.on("channelDelete", async channel => {
     const user = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_DELETE'
    }).then(audit => audit.entries.first())
    const entry = user.executor 
    let trustedusers = db.get(`trustedusers_${channel.guild.id}`)
    if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
    return console.log('Its Trusted User');
    }
 channel.clone({ name: channel.name, reason: 'ProtectionChannel Delete..' })
.then(async channel => {       
          channel.setParent(channel.parent);
         channel.setPosition(channel.position);
 });
  let logs = db.get(`acitonslogs_${channel.guild.id}`)
client.channels.cache.get(logs).send(`<@${entry.id}> Is **Deleteing Channel**.. [**Create Channel**]`)
});        

client.on("guildUpdate", async guild => {
     const user = await guild.fetchAuditLogs({
        type: 'GUILD_UPDATE'
    }).then(audit => audit.entries.first())
    const entry = user.executor 
    let trustedusers = db.get(`trustedusers_${guild.id}`)
    if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
    return console.log('Its Trusted User');
    }
  guild.setName(guild.name)
  guild.setIcon(guild.iconURL)
        });


client.on('guildMemberUpdate', (oldMember, newMember) => {
    if(!oldMember.guild) return;
    let logs = db.get(`acitonslogsrole_${oldMember.guild.id}`)
   let loga = logs
  let role1 = "790963905756266507"
  let role2 = "792013541879840778"
  let role3 = "787975229887610883"
  let role4 = "792012134870941696"
  let role5 = "792012097163624448"
  let role6 = "791014538140188695"
  let role7 = "791014090247634974"
  let role8 = "791010860705382431"
  let role9 = "791008569164038167"
  let role10 = "791008572371632138"
  let roledfo = "791008569164038167"
  let rolebasl = "790681922635431956"
  
   var logChannel = oldMember.guild.channels.cache.get(loga);
    if(!logChannel) return;
    oldMember.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
     if(oldMember.roles.cache.size < newMember.roles.cache.size) {
    let trustedusers = db.get(`adminusers_${oldMember.guild.id}`)
    if(trustedusers && trustedusers.find(find => find.user == userID)) {
    return console.log('Its Trusted User');
    }
     if(oldMember.roles.cache.get(role1) && !newMember.roles.cache.get(role1) || !oldMember.roles.cache.get(role1) && !newMember.roles.cache.get(role1) || oldMember.roles.cache.get(role1) && newMember.roles.cache.get(role1)) {
       } else {
        let rr1 = oldMember.guild.roles.cache.get(role1)
        newMember.roles.remove(rr1 , "رتبة محضورة ، ممنوع تعطيها لأحد.");
        logChannel.send(`<@${userID}> ماتقدر تعطي احد رول الرجاء التواصل مع مسؤول الرول`);
       }
     if(oldMember.roles.cache.get(roledfo) && !newMember.roles.cache.get(roledfo) || !oldMember.roles.cache.get(roledfo) && !newMember.roles.cache.get(roledfo) || oldMember.roles.cache.get(roledfo) && newMember.roles.cache.get(roledfo)) {
       } else {
        let rrdfo = oldMember.guild.roles.cache.get(roledfo)
        newMember.roles.remove(rrdfo , "رتبة محضورة ، ممنوع تعطيها لأحد.");
        logChannel.send(`<@${userID}> ماتقدر تعطي احد رول الرجاء التواصل مع مسؤول الرول`);
       }
     if(oldMember.roles.cache.get(rolebasl) && !newMember.roles.cache.get(rolebasl) || !oldMember.roles.cache.get(rolebasl) && !newMember.roles.cache.get(rolebasl) || oldMember.roles.cache.get(rolebasl) && newMember.roles.cache.get(rolebasl)) {
       } else {
        let rrbasl = oldMember.guild.roles.cache.get(rolebasl)
        newMember.roles.remove(rrbasl , "رتبة محضورة ، ممنوع تعطيها لأحد.");
        logChannel.send(`<@${userID}> ماتقدر تعطي احد رول الرجاء التواصل مع مسؤول الرول`);
       }
     if(oldMember.roles.cache.get(role2) && !newMember.roles.cache.get(role2) || !oldMember.roles.cache.get(role2) && !newMember.roles.cache.get(role2) || oldMember.roles.cache.get(role2) && newMember.roles.cache.get(role2)) {
     } else {
     let rr2 = oldMember.guild.roles.cache.get(role2)
     newMember.roles.remove(rr2 , "رتبة محضورة ، ممنوع تعطيها لأحد.");
     logChannel.send(`<@${userID}> ماتقدر تعطي احد رول الرجاء التواصل مع مسؤول الرول`);
     } // 2
     if(oldMember.roles.cache.get(role3) && !newMember.roles.cache.get(role3) || !oldMember.roles.cache.get(role3) && !newMember.roles.cache.get(role3) || oldMember.roles.cache.get(role3) && newMember.roles.cache.get(role3)) {
     } else {
     let rr3 = oldMember.guild.roles.cache.get(role3)
     newMember.roles.remove(rr3 , "رتبة محضورة ، ممنوع تعطيها لأحد.");
     logChannel.send(`<@${userID}> ماتقدر تعطي احد رول الرجاء التواصل مع مسؤول الرول`);
     } // 3
     if(oldMember.roles.cache.get(role4) && !newMember.roles.cache.get(role4) || !oldMember.roles.cache.get(role4) && !newMember.roles.cache.get(role4) || oldMember.roles.cache.get(role4) && newMember.roles.cache.get(role4)) {
     } else {
     let rr4 = oldMember.guild.roles.cache.get(role4)
     newMember.roles.remove(rr4 , "رتبة محضورة ، ممنوع تعطيها لأحد.");
     logChannel.send(`<@${userID}> ماتقدر تعطي احد رول الرجاء التواصل مع مسؤول الرول`);
     } // 4
     if(oldMember.roles.cache.get(role5) && !newMember.roles.cache.get(role5) || !oldMember.roles.cache.get(role5) && !newMember.roles.cache.get(role5) || oldMember.roles.cache.get(role5) && newMember.roles.cache.get(role5)) {
     } else {
     let rr5 = oldMember.guild.roles.cache.get(role5)
     newMember.roles.remove(rr5 , "رتبة محضورة ، ممنوع تعطيها لأحد.");
     logChannel.send(`<@${userID}> ماتقدر تعطي احد رول الرجاء التواصل مع مسؤول الرول`);
     } // 5
     if(oldMember.roles.cache.get(role6) && !newMember.roles.cache.get(role6) || !oldMember.roles.cache.get(role6) && !newMember.roles.cache.get(role6) || oldMember.roles.cache.get(role6) && newMember.roles.cache.get(role6)) {
     } else {
     let rr6 = oldMember.guild.roles.cache.get(role6)
     newMember.roles.remove(rr6 , "رتبة محضورة ، ممنوع تعطيها لأحد.");
     logChannel.send(`<@${userID}> ماتقدر تعطي احد رول الرجاء التواصل مع مسؤول الرول`);
     } // 6
     if(oldMember.roles.cache.get(role7) && !newMember.roles.cache.get(role7) || !oldMember.roles.cache.get(role7) && !newMember.roles.cache.get(role7) || oldMember.roles.cache.get(role7) && newMember.roles.cache.get(role7)) {
     } else {
     let rr7 = oldMember.guild.roles.cache.get(role7)
     newMember.roles.remove(rr7 , "رتبة محضورة ، ممنوع تعطيها لأحد.");
     logChannel.send(`<@${userID}> ماتقدر تعطي احد رول الرجاء التواصل مع مسؤول الرول`);
     } // 7
     if(oldMember.roles.cache.get(role8) && !newMember.roles.cache.get(role8) || !oldMember.roles.cache.get(role8) && !newMember.roles.cache.get(role8) || oldMember.roles.cache.get(role8) && newMember.roles.cache.get(role8)) {
     } else {
     let rr8 = oldMember.guild.roles.cache.get(role8)
     newMember.roles.remove(rr8 , "رتبة محضورة ، ممنوع تعطيها لأحد.");
     logChannel.send(`<@${userID}> ماتقدر تعطي احد رول الرجاء التواصل مع مسؤول الرول`);
     } // 8
     if(oldMember.roles.cache.get(role9) && !newMember.roles.cache.get(role9) || !oldMember.roles.cache.get(role9) && !newMember.roles.cache.get(role2) || oldMember.roles.cache.get(role9) && newMember.roles.cache.get(role9)) {
     } else {
     let rr9 = oldMember.guild.roles.cache.get(role9)
     newMember.roles.remove(rr9 , "رتبة محضورة ، ممنوع تعطيها لأحد.");
     logChannel.send(`<@${userID}> ماتقدر تعطي احد رول الرجاء التواصل مع مسؤول الرول`);
     } // 9
     if(oldMember.roles.cache.get(role10) && !newMember.roles.cache.get(role10) || !oldMember.roles.cache.get(role10) && !newMember.roles.cache.get(role10) || oldMember.roles.cache.get(role10) && newMember.roles.cache.get(role10)) {
     } else {
     let rr10 = oldMember.guild.roles.cache.get(role10)
     newMember.roles.remove(rr10 , "رتبة محضورة ، ممنوع تعطيها لأحد.");
     logChannel.send(`<@${userID}> ماتقدر تعطي احد رول الرجاء التواصل مع مسؤول الرول`);
      } // Rr.#1835
    } // Rr.#1835
  }) // Rr.#1835
  }); // Rr.#1835



/*client.on('roleUpdate', (oldRole, newRole) => {
 
      if(!oldRole.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
      if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
     let logs = db.get(`acitonslogs_${oldRole.guild.id}`)
      var logChannel = oldRole.guild.channels.cache.get(logs);
      if(!logChannel) return;
 
      oldRole.guild.fetchAuditLogs().then(logs => {
          var userID = logs.entries.first().executor.id;
          var userAvatar = logs.entries.first().executor.avatarURL;
 
          if(oldRole.permissions !== newRole.permissions) {
                let trustedusers = db.get(`trustedusers_${oldRole.guild.id}`)
    if(trustedusers && trustedusers.find(find => find.user == userID)) {
    return console.log('Its Trusted User');
    }
  const rolexxx = oldRole.guild.roles.cache.find(role => role.name === newRole.name)


              let roleUpdateName = new Discord.MessageEmbed()
    .setTitle("**Attempt to change the role permission**")//By: Rr.#0010
    .setFooter("© Rr.#0010, All Rights Reserved 2020")
    .addField("**Role:**", `${newRole.name}`) 
    .addField("**Old Permissions:**", `${oldRole.permissions}`) 
    .addField("**New Permissions:**", `${newRole.permissions}`) 
    .addField("**Actor:**", `<@${userID}>`)  
              logChannel.send(roleUpdateName);
        rolexxx.edit({
         permissions : []
      });
          }
      })
  });
  client.on("guildMemberAdd", member => {

  if(member.user.bot) return member.kick()
  });
  
*/
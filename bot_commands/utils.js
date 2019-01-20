const Discord = require('discord.js');

let utils = {
    cooldownMessage: `Slow down please, you're on cooldown for this command.`,
    cooldownRichMessage: new Discord.RichEmbed().addField('Cooldown Notice', this.cooldownMessage),
    addToCooldown(membersOnCooldown, memberID, commandTimeout){
        membersOnCooldown.add(memberID);
        setTimeout(function(){
            membersOnCooldown.delete(memberID);
        }, commandTimeout);
    },
    memberIsOnCooldown(membersOnCooldown, memberID){
        return membersOnCooldown.has(memberID);
    }
};

module.exports = utils;
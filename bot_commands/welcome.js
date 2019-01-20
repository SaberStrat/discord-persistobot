const utils = require('./utils');
const Discord = require('discord.js');

let COOLDOWN = 3000;

let membersOnCooldown = new Set();

let commandMap = {
    func: welcome,
    helptext: `A command to show the welcome message for new users. 
        Example: \`!welcome Welcome!\``,
    set: {
        func: welcomeSet,
        helptext: `A command to edit the welcome message for new users. 
        Example: \`!welcome set Welcome to the server!\``
    }
};

// Command: !welcome arg0 arg1 ...
function welcome(client, message, cmdArgs, rank) {
    return 0;
}

function welcomeSet(client, message, cmdArgs, rank) {
    return 0;
}

module.exports = [
    commandMap,
    welcome
];
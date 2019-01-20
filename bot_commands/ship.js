// const Command = require('./command');
const utils = require('./utils');
const Discord = require('discord.js');

/* class Ship extends Command {
    commandTimeout = 2000;
    constructor(logger) {
        super(logger);
    }
    run(client, message, cmdArgs, rank) {
        
    }
} */

let COOLDOWN = 5000;

let membersOnCooldown = new Set();

let richEmbedFieldNames = {
    focus: "Focus",
    length: "Length",
    height: "Height",
    beam: "Beam",
    minCrew: "Min Crew",
    maxCrew: "Max Crew",
    cargoCapacity: "Cargo Capacity",
    price: "Price"
};

let commandProperties = {
    helptext: `A search on the official Star Citizen wiki, for the ship in the Query. 
    Example: \`!ship vulcan\``,
};

let commandMap = {
    func: ship,
    helptext: `A search on the official Star Citizen wiki, for the ship in the Query. 
        Example: \`!ship vulcan\``,
    add: {
        func: shipAdd,
        helptext: `Add the ship in the query to your personal fleet. 
        Example: \`!ship add vulcan\``
    },
    remove: {
        func: shipRemove,
        helptext: `Remove the ship in the query to your personal fleet. 
        Example: \`!ship add vulcan\``
    }
}

// Command: !ship arg0 arg1 ...
function ship(client, message, cmdArgs, rank) {
    if(utils.memberIsOnCooldown(membersOnCooldown, message.member.id)){
        return [
            utils.cooldownRichMessage,
            message.channel.id
        ]
    } else {
        utils.addToCooldown(membersOnCooldown, message.member.id, COOLDOWN)
        switch(cmdArgs[0]) {
            case 'add':
            return [
                shipAdd(client, message, cmdArgs.slice(1), rank),
                message.channel.id
            ]; 
            break;
            default:
            return [
                shipDataToRichEmbed(getShipData(client, message, cmdArgs, rank)),
                message.channel.id
            ]
        }
    }
}

// Command: !ship add arg0 arg1 ...
function shipAdd(client, message, cmdArgs, rank) {
    console.log("add");
    return 0;
}

// Command: !ship remove arg0 arg1 ...
function shipRemove(client, message, cmdArgs, rank) {}

function getShipData(client, message, cmdArgs, rank) {
    // TODO: Parse HTTP Response data from https://starcitizen.tools
    let name = "Carrack";
    let focus = "love";
    let length = "long";
    let height = "tall";
    let beam = "thicc";
    let minCrew = "3";
    let maxCrew = "5";
    let cargoCapacity = "1000";
    let price = "400";
    return {
        name: name,
        focus: focus,
        length: length,
        height: height,
        beam: beam,
        minCrew: minCrew,
        maxCrew: maxCrew,
        cargoCapacity: cargoCapacity,
        price: price
    };
}

function shipDataToRichEmbed(obj){
    /*
    return new Discord.RichEmbed({
        title: obj.name,
        // This throws a (node:46846) UnhandledPromiseRejectionWarning: DiscordAPIError: Invalid Form Body
        // embed.fields[0].name: This field is required 
        // fields: Object.keys(obj).map(key => {return {name: richEmbedFieldNames[key], value: obj[key]}})
        fields: [{
            name: richEmbedFieldNames["focus"], 
            value: obj["focus"],
            inline: true
        },{
            name: richEmbedFieldNames["length"], 
            value: obj["length"],
            inline: true
        },{
            name: richEmbedFieldNames["height"], 
            value: obj["height"],
            inline: true
        },{
            name: richEmbedFieldNames["beam"], 
            value: obj["beam"],
            inline: true
        },{
            name: richEmbedFieldNames["minCrew"], 
            value: obj["minCrew"],
            inline: true
        },{
            name: richEmbedFieldNames["maxCrew"], 
            value: obj["maxCrew"],
            inline: true
        },{
            name: richEmbedFieldNames["cargoCapacity"], 
            value: obj["cargoCapacity"],
            inline: true
        },{
            name: richEmbedFieldNames["price"], 
            value: obj["price"],
            inline: true
        }]
    });
    */
   return new Discord.RichEmbed()
   .setTitle(obj.name)
   .addField(richEmbedFieldNames["focus"], obj["focus"], true)
   .addField(richEmbedFieldNames["length"], obj["length"], true)
   .addBlankField(true)
   .addField(richEmbedFieldNames["height"], obj["height"], true)
   .addField(richEmbedFieldNames["beam"], obj["beam"], true)
   .addBlankField(true)
   .addField(richEmbedFieldNames["minCrew"], obj["minCrew"], true)
   .addField(richEmbedFieldNames["maxCrew"], obj["maxCrew"], true)
   .addBlankField(true)
   .addField(richEmbedFieldNames["cargoCapacity"], obj["cargoCapacity"], true)
   .addField(richEmbedFieldNames["price"], obj["price"], true)
   .addBlankField(true);
}

module.exports = {
    commandMap,
    ship
};
var discord = require('discord.io');
var winston = require('winston');
var auth = require('./auth.json');
var botcmds = require('./botcommands');
var NovaDbConnector = require('./novadbconnector');
var ShipData = require('./shipdata');
var UserData = require('./userdata');
var SquadronData = require('./squadrondata');

// Define logger
var logger = winston.createLogger({
    level: 'debug',
    transports: new winston.transports.File({
        filename: './debug.log'
    })
});

// Initialize Discord Bot
var bot = new discord.Client({
    token: auth.token,
    autorun: true
});

// Initialize DB Connector
var dbconn = new NovaDbConnector('./novadb.sqlite3');

bot.on('ready', function(evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function(user, userID, channelID, message, evt){
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!'){
        let args = message.substring(1).split(' ');
        let cmd = args[0];
        args = args.splice(1);
        if(botcmds.keys().includes(cmd))
                botcmds[cmd].exec(args);
        else
                bot.sendMessage({
                        to: channelID,
                        message: "Unknown command: "+cmd+"."
                });
    } else if(message.substring(0, 1) == '+'){
        let arg = message.substring(1);
        botcmds.ship.add(arg, user, logger);
    }
});
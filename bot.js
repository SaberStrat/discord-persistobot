var discord = require('discord.io');
var winston = require('winston');
var auth = require('./auth.json');
var botcmds = require('./botcommands');
var NovaDbConnector = require('./novadbconnector');
var Ship = require('./ship');
var User = require('./user');
var Fleet = require('./fleet');
var Notification = require('./notification');

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
var dbconn = new NovaDbConnector('./novadb.json');
// Initialize commands
// Commands come as objects. If commands offer persistence
// they are objects of a specific class. If no persistence,
// they are simple objects of class Object.
var ship = new Ship(dbconn);
var user = new User(dbconn);
var notification = new Notification(dbconn);

bot.on('ready', function(evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function(user, userID, channelID, message, evt){
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
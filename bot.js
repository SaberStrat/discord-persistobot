var discord = require('discord.io');
var winston = require('winston');
var auth = require('./auth.json');
var shipdbClient = require('./shipdb.js');
var sc = require('./sc.js');

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
        switch(cmd) {
            // !ping
            case 'ping':
            bot.sendMessage({
                to: channelID,
                message: 'Pong!'
            });
            break;
            // !hello
            case 'hello':
            bot.sendMessage({
                to: channelID,
                message: 'Hello, ' + user
            });
        }
    } else if(message.substring(0, 1) == '+'){
        let args = message.substring(1);
        shipdbClient.addShipToFleet(args, userID);
    }
});
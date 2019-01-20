const Discord = require('discord.js');
const winston = require('winston');
const auth = require('./auth.json');
// const NovaDbConnector = require('./novadbconnector');
const {shipCommandMap, ship} = require('./bot_commands/ship.js');
const {welcomeCommandMap, welcome} = require('./bot_commands/welcome.js');
// const User = require('./bot_commands/user');
// const Fleet = require('./bot_commands/fleet');
// const Notification = require('./notification');

// Define logger
const logger = winston.createLogger({
    level: 'debug',
    transports: new winston.transports.File({
        filename: './debug.log'
    })
});

// Initialize Discord Bot
let bot = new Discord.Client();
bot.login(auth.token);

// Initialize DB Connector
// let dbconn = new NovaDbConnector('./novadb.json');
// Initialize commands
// Commands come as objects. If commands offer persistence
// they are objects of a specific class. If no persistence,
// they are simple objects of class Object.
// let ship = new Ship(logger);
// let user = new User(logger);
// let notification = new Notification(dbconn);

bot.on('ready', function() {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(`${this.username} - (${this.id})`);
});
bot.on('message', function(message) {
    let rank = 0;
    let cmdResult;
    switch(message.content.substring(0, 1)){
        case '!':
            let [cmd, ...cmdArgs] = message.content.substring(1).split(' ');
            switch(cmd){
                case 'ship':
                    cmdResult = ship(this,  // bot client object
                        message,            // message object
                        cmdArgs,            // arguments after the command, e.g. !<cmd> <cmd_args0> <cmd_args1>...
                        rank);              // member rank
                    message.reply(cmdResult[0]);
                    break;
                case 'welcome':
                    cmdResult = welcome(this, message, cmdArgs, rank);
                default:
                    message.reply(`Unknown command: \`${cmd}\``)
                    .catch(logger.error(`Could not send reply to command: ${message}`));
            }
            break;
        case '+':
            let args = message.content.substring(1).split(' ');
            ship.add(this, message, ['add', ...args], rank);
            break;
        case '?':
            // Alternative for !help COMMAND
            break;
    }
});
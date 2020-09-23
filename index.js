const Discord = require('discord.js');
const Config = require("./Bot Code/config.json");
const Collector = require('./Bot Code/MessageCollector');
const bot = new Discord.Client(); //initiated Discord Bot
const PREFIX = Config.Prefix;
const MessageCenter = require('./Bot Code/MessageCenter.js'); 

module.exports = {bot}; //making it avaliable to Message Center

bot.login(Config.Token);//Logs into Bot account

bot.on('ready' , () =>{
    bot.user.setActivity("Bootloops really su.....Bootloops really suc....")
    console.log("BeeP BooP Bot Online Now")//successful startup log
})

bot.on('message', message =>{//useless legacy command. Sometimes used for debugging
    if(message.content === "Doper"){
        message.reply("doper");
    }
    else if(message.content === "Dopest"){
        message.reply('Dopestest');
    }
    else if(message.content === 'Fuck'){
        message.reply('Fuck you too!');
    }
})

bot.on('message', message =>{
    if(message.content[0] === PREFIX){ //check for prefix early to save resources
        if (message.author.bot) return; //ignores itself and other bots
        if (message.content.length<=1) return;//check for length of message
        message.channel.startTyping();
        MessageCenter.messageHandler(message,PREFIX);
        msg = Collector.Return();
        if (msg != ''){
            message.channel.send(msg);
            Collector.Clear();
        }
        message.channel.stopTyping();
    }
})
bot.on('error', () =>{
    MessageCenter.saveall();
    console.log("ERROR. SAVE ATTEMPTED. CLIENT CLOSING.");
})


//Create Module that has an add function and a read function. The idea is that you can add text to it endlessly and at some point it will read that text back to you. That way a command can return complex text lines.
const Discord = require('discord.js');
const Config = require("./Bot Code/config.json");
const UserInfo = require("./Bot Code/UserDataReader.js");
const bot = new Discord.Client(); //initiated Discord Bot
module.exports = {bot}; //making it avaliable to Message Center
{
    const TOKEN = Config.Token; //Bot token. ONLY CHANGE HERE
    //Brackets to make it collapsable and therefore hidable for plan text
    bot.login(TOKEN);//Logs into Bot account

}
const PREFIX = Config.Prefix; //Global across Project. Should be passed through if nescessary.
const MessageCenter = require('./Bot Code/MessageCenter.js') 

bot.on('ready' , () =>{
    bot.user.setActivity("Bootloops really su.....Bootloops really suc....")
    console.log("this bot it online")//successful startup log
})

bot.on('message', message =>{//useless legacy command. Sometimes used for debugging
    if(message.content === "Hello"){
        message.reply("HELLO FRIEND");
    }
})

bot.on('message', message =>{
    if(message.content[0] === PREFIX){ //check for prefix early to save resources
        if (message.author.bot) return; //ignores itself and other bots
        if (message.content.length<=1) return;//check for length of message
        message.channel.startTyping();
        msg = MessageCenter.entry(message,PREFIX)
        if (msg != "NothingToSend"){
            message.channel.send(msg);
        }
        message.channel.stopTyping();
    }
})
bot.on('error', () =>{
    MessageCenter.saveall();
    console.log("ERROR. SAVE SUCCESSFULL. CLIENT CLOSING.");
})
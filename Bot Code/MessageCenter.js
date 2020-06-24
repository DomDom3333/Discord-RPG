//This file is dedicated to taking all messages and sorting them to the according functions accross the bot. ALL messages go through here. This was created to clean up Index.js
module.exports = {
    entry: function(message, PREFIX) {
        console.log('New message from "' + message.author.username + '" (ID: ' + message.author.id + ')');
        console.log("message: " + message.content)
        messageHandler(message, PREFIX);
    }
}
//code outside of functions only runs at init (once).
const Discord = require("discord.js");
const bot = require("../index.js").bot; //import from index
const fs = require('fs');

var commandList = [];
bot.commands = new Discord.Collection(); //creates list of allowed commands based on folder content.
const commandFiles = fs.readdirSync("./Bot Code/commands/").filter(file => file.endsWith('.js'));
for(const filename of commandFiles){
    const command = require (`./commands/${filename}`); //dynamically creat folder of story related commands per user? 
    bot.commands.set(command.name,command);
    commandList.push(command.name);
}


function messageHandler(message, PREFIX){
    let args = message.content.substring(PREFIX.length).split(" ");
    for (i = 0; i<args.length;i++){//all lowercase for user compatibility
        args[i] = args[i].toLowerCase();
    }
    if (message.author.id === "110596839018856448"){ //ADMIN CONTROLL
        switch (args[0]){
            case 'save':
                //call function to save current state of Bot
                message.channel.send("You tried to save")
                break;
            case 'load':
                //call fuction to load a state of the Bot
                message.channel.send("you tried to load")
                break;
        }
    }
   try {
        bot.commands.get(args[0]).execute(message,args);//attempt to run a given command. if it exists
        if(args[0] === "help"){
            msg = ""
            for (i = 0; i < commandList.length; i++){
                msg = msg.concat("!", commandList[i], '\n');
            }
            message.channel.send(msg);
        }
    }
    catch(err) {//failover if a command doesnt exist

    }
}
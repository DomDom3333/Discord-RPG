//This file is dedicated to taking all messages and sorting them to the according functions accross the bot. ALL messages go through here. This was created to clean up Index.js
//Message Center works by takin in the input, figuring out where it needs to go, and collecting up any responses, so a single large message can be sent rather than many small ones
//in short, its an central IO hub between the end user and the bot

// -----------------------------------------------------------------------------------------------------------------------------------------------------------


module.exports = {
    entry: function(message, PREFIX) {
        console.log('New message from "' + message.author.username + '" (ID: ' + message.author.id + ')');
        console.log("message: " + message.content)
        return messageHandler(message, PREFIX);
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


function messageHandler(message, PREFIX){ //First split for messages
    let args = message.content.substring(PREFIX.length).split(" ");
    for (i = 0; i<args.length;i++){//all lowercase for user compatibility
        args[i] = args[i].toLowerCase();
    }
    if (message.author.id === "110596839018856448"){ //ADMIN CONTROLL
        switch (args[0]){
            case 'save':
                //call function to save current state of Bot
                return ("You tried to save")
                break;
            case 'load':
                //call fuction to load a state of the Bot
                return ("you tried to load")
                break;
            case 'exit': //Closes bot via command
                message.channel.send("Bot shutting down. Goodbye");
                console.log(".");
                console.log(".");
                console.log(".");
                console.log(".");
                console.log(".");
                console.log(".");
                console.log("--------------------------------------------");
                console.log("Bot being Shut down by: @"+ message.author.username + "#" + message.author.discriminator + " (ID: " + message.author.id + ")");
                console.log("Shutdown Location: " + message.guild.name + " (ID: " + message.guild.id + ")");
                console.log("--------------------------------------------");
                console.log(".");
                console.log(".");
                console.log(".");
                console.log(".");
                console.log(".");
                console.log(".");
                process.exit(1);
                break;
        }
    }
   //try {
        if(args[0] === "help"){ //awkward lsiting of all commands. Will be removed/overhauled at a later date
            msg = ""
            for (i = 0; i < commandList.length; i++){
                msg = msg.concat("!", commandList[i], '\n');
            }
            return (msg);
        }
        return bot.commands.get(args[0]).execute(message,args);//attempt to run a given command. if it exists
    /*}
     catch(err) {//failover if a command doesnt exist
        return "NothingToSend"
    } */
}
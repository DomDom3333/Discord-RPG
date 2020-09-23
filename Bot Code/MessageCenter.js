//This file is dedicated to taking all messages and sorting them to the according functions accross the bot. ALL messages go through here. This was created to clean up Index.js
//Message Center works by takin in the input, figuring out where it needs to go, and collecting up any responses, so a single large message can be sent rather than many small ones
//in short, its an central IO hub between the end user and the bot

// -----------------------------------------------------------------------------------------------------------------------------------------------------------

//code outside of functions only runs at init (once).
const Discord = require("discord.js");
const bot = require("../index.js"); //import from index
const CharInfo = require('./CharacterReader');
const UserInfo = require('./UserDataReader');
const GameInfo = require('./GameFileReader');
const Collector = require('./MessageCollector');
const Config = require('./config.json');
const fs = require('fs');

var commandList = [];
bot.commands = new Discord.Collection(); //creates list of allowed commands based on folder content.
const commandFiles = fs.readdirSync("./Bot Code/commands/").filter(file => file.endsWith('.js'));

for(const filename of commandFiles){
    const command = require (`./commands/${filename}`); 
    bot.commands.set(command.name,command);
    commandList.push(command.name);
}

module.exports = {
    saveall(){
        UserInfo.Save();
        CharInfo.Save();
        GameInfo.Save();
    },
    messageHandler(message) {//First split for messages

        var args = messagePrep(message);
        if(AdminFunctions(message,args)) return; //if its an Admin Function, return.
        if(!commandList.includes(args[0])) return;
        console.log('New command from "' + message.author.username + '" (ID: ' + message.author.id + '). Message: '+ message.content );
        if(!LoadNewUser(message)) return; //halts if something goes wrong
        try {
            if(args[0] === "help"){ //awkward listing of all commands. Will be removed/overhauled at a later date
                msg = ""
                for (i = 0; i < commandList.length; i++){
                    msg = msg.concat(Config.Prefix, commandList[i], '\n');
                }
                Collector.Add(msg);
            }
            var tempmsg = bot.commands.get(args[0]).execute(message,args);//attempt to run a given command. if it exists
            if (tempmsg != null){//Failover command for any messages that are not collected by the collector yet
                Collector.Add('The next part was not added to the Collector as intended.')
                Collector.Add(tempmsg);
            }
            }
            catch(err) {//failover if a command doesnt exist or an error occours
                Collector.Add("Something went wrong while processing your command. You should not be seeing this message. If you want to help solve the issiue, take a screenshot of your interaction with the bot and contact an Admin.");
            }
    }
}

function messagePrep(message){
    let args = message.content.substring(Config.Prefix.length).split(" ");
    for (i = 0; i<args.length;i++){//all lowercase for user compatibility
        args[i] = args[i].toLowerCase();
    }
    return args;
}
function LoadNewUser(message){
    if(!UserInfo.checkExistance(message)){
        console.log('Failed to verify Server and/or User Existance. Stopping.');
        Collector.Add('Something went wrong and you message was not processed. Please contact and Admin and report the issiue.')
        return false;
    }
    UserInfo.updateIDs(message);
    CharInfo.readChar(message);
    GameInfo.updateGame(message);
    return true;
}
function AdminFunctions(message,args){
    if (Config.Admins.includes(message.author.id)){ //ADMIN CONTROLL
        switch (args[0]){
            case 'save':
                Collector.Add('Welcome Admin <@' + message.author.id + '>.')
                UserInfo.Save();
                CharInfo.Save();
                GameInfo.Save();               
                Collector.Add("You tried to save");
                return true;
                break;
            case 'load':
                Collector.Add('Welcome Admin <@' + message.author.id + '>.')
                //call fuction to load a state of the Bot
                Collector.Add("You tried to load");
                return true;
                break;
            case 'exit': //Closes bot via command
                Collector.Add('Welcome Admin <@' + message.author.id + '>.')
                message.channel.send("Bot shutting down. Goodbye");
                this.saveall();
                console.log(". \n . \n . \n . \n . \n . \n");
                console.log("--------------------------------------------");
                console.log("Bot being Shut down by: @"+ message.author.username + "#" + message.author.discriminator + " (ID: " + message.author.id + ")");
                console.log("Shutdown Location: " + message.guild.name + " (ID: " + message.guild.id + ")");
                console.log("--------------------------------------------");
                console.log(". \n . \n . \n . \n . \n . \n");
                process.exit(1);
                return true;
                break;
            case 'add':
                Collector.Add('Welcome Admin <@' + message.author.id + '>.')
                switch (args[1]){
                    case 'admin':
                        if(Config.Admins.indexOf(message.mentions.users.first().id) < 0){
                            Config.Admins.push(message.mentions.users.first().id)
                            SaveConfig();
                            Collector.Add('Admin was successfully added.');
                        }
                        else{
                            Collector.Add('This user is already registerd as Admin.');
                        }
                        return true;
                        break;
                    default:
                        return false;
                        break;
                }
                break;
            case 'remove':
                Collector.Add('Welcome Admin <@' + message.author.id + '>.')
                switch (args[1]){
                    case 'admin':
                        if(message.mentions.users.first().id != '110596839018856448'){
                            var index = Config.Admins.indexOf(message.mentions.users.first().id);
                            if(index>0){
                                Config.Admins.splice(index,1);
                                SaveConfig();
                                Collector.Add('User is no longer Admin.')
                            }
                            else{
                                Collector.Add('This user is not registerd as an Admin. Failed to remove.')
                            }
                        }
                        else{
                            Collector.Add('bEEp BoOp, CrEAtOr iS alwAyS AdMIn, bEeP bOOp.')
                        }
                        return true;
                        break;
                    default:
                        return false;
                        break;
                }
                break;
            case 'test':
                Collector.Add('Welcome Admin <@' + message.author.id + '>.')
                Collector.Add('This is a Test message to see if this is working. This could later be used as a Diagnostics command.')
                return true;
                break;
            default:
                return false;
                break;
        }
    }
    else{
        return false;
    }  
}
function SaveConfig(){ //basically passes the current state of userData into the Json File and then re-reads it, thereby updating both states.
    var path = './config.json';
    try{
        fs.writeFileSync(path,JSON.stringify(Config));
    }
    catch(err){
        console.log("Something went wrong while writing to Config File.");
    }
}
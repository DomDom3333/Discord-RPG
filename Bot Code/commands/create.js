//This command is for creating and uploading Game and Character files.

const request = require('request');
const fs = require(`fs`);
const shelljs = require('shelljs');
const UserInfo = require("../UserDataReader.js");
const Collector = require('../MessageCollector.js');


module.exports = {
    name: 'create',
    description: "creates a Character,game or Party",
    enabled: true, // if false, command will not work
    execute(message,args){
        if(this.enabled){
            switch (args[1]){
                case "character":
                    createCharacter(message,args);
                    break;
                case "game":
                    createGame(message,args);
                    break;
                case "party":
                    return ("Not yet implimented");
                    break;
                default:
                    return ("Please specify what you want to create. (Character/Game/Party)")
            }
        }
        else{
            return ("This command is currently DISABLED");
        }
    }
}

function createGame(message, args){ //Creates Directory and fills in the JSON file of the game
    if(message.attachments.array()[0] != null){
        if (args[2] != null){ //Check for name
        var dir = './Resources/Servers/' + message.guild.id + '/' + message.author.id + '/GameFiles/' + args[2];
        var filename = message.attachments.array()[0].name;
        filename = filename.toLowerCase();
            if(!UserInfo.allGames.includes(filename)){
                if(filename.substring(filename.length-4) === 'json'){//check for filetype
                    shelljs.mkdir('./Resources/Servers/' + message.guild.id + '/' + message.author.id + '/GameFiles/' + args[2]);//create directory
                    if(downloadGame(message,args,dir)){
                        if(UserInfo.addGame(args[2].toLowerCase())){//if success, return success
                            Collector.Add("Successfully added a Game. You can now select it as your current one by typing: " + CONFIG.Prefix + "select game '" + args[2] + "'")
                            return true;
                        }
                        else{
                            Collector.Add("Something went wrong while trying to add the game to your avaliable game list");
                            return false;
                        }
                    }  
                    else{
                        Collector.Add("Something went wrong while getting the game. Please try again later or contact an admin.");
                        return false;
                    }              
                }
                else{
                    Collector.Add("Please only upload JSON files. All other will be ignored");
                    return false;
                }
            }
            else{
                Collector.Add("Game already exists");
                return false;
            }
        }
        else {
            Collector.Add("Please add a name for the game (!create Game [name]");
            return false;
        }
    }
    else {
        Collector.Add("Please upload a JSON Game File along with the command");
        return false;
    }

}

function downloadGame(message,args,dir){ //Downloads a file from the given URL
    try{
        var url = message.attachments.array()[0].url;
        request.get(url)//downloads file
        .on('error', console.error)
        .pipe(fs.createWriteStream(dir + '/' + args[2] + '.json'));
        return true;
    }
    catch(err){
        return false;
    }

}

function createCharacter(message,args){//Creates Directory and fills in the JSON file of the Character
    if(message.attachments.array()[0] != null){
        if (args[2] != null){//check for name
        var dir = './Resources/Servers/' + message.guild.id + '/' + message.author.id + '/CharFiles/' + args[2];
        var filename = message.attachments.array()[0].name;
        filename = filename.toLowerCase();
            if(filename.substring(filename.length-4) === 'json'){
                shelljs.mkdir('./Resources/Servers/' + message.guild.id + '/' + message.author.id + '/CharFiles/' + args[2]);
                if(downloadChar(message,args,dir)){
                    if(UserInfo.addChar(args[2].toLowerCase())){ //if success, return success
                        Collector.Add("Successfully added a Character. You can now select it as your current one by typing: " + CONFIG.Prefix + "select game '" + args[2] + "'");
                        return true;
                    }
                    else{
                        Collector.Add("Something went wrong while trying to add the Character to your avaliable Char list");
                        return false;
                    }
                }
            }
            else{
                Collector.Add("Please only upload JSON files. All other will be ignored");
                return false;
            }
        }
        else {
            Collector.Add("Please add a name for the Character (!create Character [name]");
            return false;
        }
    }
    else {
        Collector.Add("Please upload a JSON Character File along with the command");
        return false;
    }
}

function downloadChar(message,args,dir){//Downloads a file from the given URL
    var url = message.attachments.array()[0].url;
    request.get(url)
    .on('error', console.error)
    .pipe(fs.createWriteStream(dir + '/' + args[2] + '.json'));
    return true;
}
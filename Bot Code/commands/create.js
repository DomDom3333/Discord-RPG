//This command is for creating and uploading Game and Character files.

const request = require('request');
const fs = require(`fs`);
const shelljs = require('shelljs');
const UserInfo = require("../UserDataReader.js");


module.exports = {
    name: 'create',
    description: "creates a Character,game or Party",
    enabled: true, // if false, command will not work
    execute(message,args){
        if(this.enabled){
            switch (args[1]){
                case "character":
                    return createCharacter(message,args);
                    break;
                case "game":
                    return createGame(message,args);
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

//const something = require(".../")

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
                        return UserInfo.addGame(args[2].toLowerCase());
                    }  
                    else{
                        return "Something went wrong while getting the game. Please try again later or contact an admin.";
                    }              
                }
                else{
                    return ("Please only upload JSON files. All other will be ignored");
                }
            }
            else{
                return "Game already exists";
            }
        }
        else {
            return ("Please add a name for the game (!create Game [name]");
        }
    }
    else {
        return ("Please upload a JSON Game File along with the command");
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
                    return UserInfo.addChar(args[2].toLowerCase());
                }
            }
            else{
                return ("Please only upload JSON files. All other will be ignored")
            }
        }
        else {
            return ("Please add a name for the Character (!create Character [name]");
        }
    }
    else {
        return ("Please upload a JSON Character File along with the command");
    }
}

function downloadChar(message,args,dir){//Downloads a file from the given URL
    var url = message.attachments.array()[0].url;
    request.get(url)
    .on('error', console.error)
    .pipe(fs.createWriteStream(dir + '/' + args[2] + '.json'));
    return true;
}
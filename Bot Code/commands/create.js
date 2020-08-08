//This command is for creating and uploading Game and Character files.

const request = require('request');
const fs = require(`fs`);
const shelljs = require('shelljs');

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

function createGame(message, args){ //Creates Directory and fills in the JSON file of the game
    if(message.attachments[0] != null){
        var dir = './Resources/Servers/' + message.guild.id + '/' + message.author.id + '/GameFiles/' + args[2];
        var filename = message.attachments.array()[0].name;
        filename = filename.toLowerCase();
        if (args[2] != null){ //Check for name
            if(filename.substring(filename.length-4) === 'json'){//check for filetype
                shelljs.mkdir('-p', './Resources/Servers/' + message.guild.id + '/' + message.author.id + '/GameFiles/' + args[2]);//create directory
                downloadGame(message,args,dir);
            }
            else{
                return ("Please only upload JSON files. All other will be ignored");
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
    var url = message.attachments.array()[0].url;
    request.get(url)//downloads file
    .on('error', console.error)
    .pipe(fs.createWriteStream(dir + '/' + args[2] + '.json'));

}

function createCharacter(message,args){//Creates Directory and fills in the JSON file of the Character
    if(message.attachments[0] != null){
        var dir = './Resources/Servers/' + message.guild.id + '/' + message.author.id + '/CharFiles/' + args[2];
        var filename = message.attachments.array()[0].name;
        filename = filename.toLowerCase();
        if (args[2] != null){
            if(filename.substring(filename.length-4) === 'json'){
                shelljs.mkdir('-p', './Resources/Servers/' + message.guild.id + '/' + message.author.id + '/CharFiles/' + args[2]);
                downloadChar(message,args,dir);
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
        return ("Please upload a JSON Game File along with the command");
    }
}

function downloadChar(message,args,dir){//Downloads a file from the given URL
    var url = message.attachments.array()[0].url;
    request.get(url)
    .on('error', console.error)
    .pipe(fs.createWriteStream(dir + '/' + args[2] + '.json'));
    return true;
}
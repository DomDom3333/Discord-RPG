let request = require('request');
let fs = require(`fs`);
let shelljs = require('shelljs');
let character = require('../CharacterReader.js');//for later use

module.exports = {
    name: 'create',
    description: "creates a Character,game or Party",
    enabled: true,
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
            return "This command is currently DISABLED"
        }
    }
}

function createGame(message, args){ //Creates Directory and fills in the JSON file of the game
    var dir = './Resources/Servers/' + message.guild.id + '/' + message.author.id + '/GameFiles/' + args[2];
    var filename = message.attachments.array()[0].name;
    filename = filename.toLowerCase();
    if (args[2] != null){ //Check for name
        if(filename.substring(filename.length-4) === 'json'){//check for filetype
            shelljs.mkdir('-p', './Resources/Servers/' + message.guild.id + '/' + message.author.id + '/GameFiles/' + args[2]);//create directory
            downloadGame(message,args,dir);
        }
        else{
            return ("Please only upload JSON files. All other will be ignored")
        }
    }
    else {
        return ("Please add a name for the game (!game create [name]");
    }
}

function downloadGame(message,args,dir){ //Downloads a file from the given URL
    var url = message.attachments.array()[0].url;
    request.get(url)//downloads file
        .on('error', console.error)
        .pipe(fs.createWriteStream(dir + '/' + args[2] + '.json'));
}

function createCharacter(message,args){//Creates Directory and fills in the JSON file of the Character
    var dir = './Resources/Servers/' + message.guild.id + '/' + message.author.id + '/CharFiles/' + args[2];
    var filename = message.attachments.array()[0].name;
    filename = filename.toLowerCase();
    if (args[2] != null){
        if(filename.substring(filename.length-4) === 'json'){
            shelljs.mkdir('-p', './Resources/Servers/' + message.guild.id + '/' + message.author.id + '/CharFiles/' + args[2]);
            console.log("filname = json");
            downloadChar(message,args,dir);
        }
        else{
            return ("Please only upload JSON files. All other will be ignored")
        }
    }
}

function downloadChar(message,args,dir){//Downloads a file from the given URL
    var url = message.attachments.array()[0].url;
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(dir + '/' + args[2] + '.json'));
}
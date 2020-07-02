const thisthat = require("shelljs");
const Reader = require("./JSONReader.js");

module.exports = {
    name: '',
    gender: '',
    race:'',
    stats:'',
    loaction(message,args){
        return findLocation(message,args);
    },
    ChangeChar(message,args){
        updateUserFile(args[2]);
        
    },
    load(message,args){
        loadChar(message,args);
    }
}

function save(message,args){
    JSON.stringify();
    gender = "male";
}
function loadChar(message,args){
    var dir = './Resources/Servers/' + message.guild.id + '/' + message.author.id + '/CharFiles/' // + character/filename
}
function updateUserFile(){

}

function findLocation(message,args){
    userID = message.author.id;
    serverID = message.guild.id;
    return Reader.getCharName(serverID,userID);
}

//This file is not yet in use. This will be used for opening, saving and editing character files
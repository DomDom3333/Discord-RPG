const fs = require('fs');
const UserInfo = require("../UserDataReader.js");

module.exports = {
    name: 'list',
    description: "Lists all avaliable games/characters",
    enabled: true, // if false, command will not work
    execute(message,args){ //second argument tree
        if(this.enabled){
            switch (args[1]){
                case "games":
                    return listGames(message,args);
                    break;
                case "characters":
                    return listChars(message,args);
                    break;
                default:
                    return "Please specify whether you want to list Games or Characters."
                    break;
            }
        }
    }
}



function listGames(message,args){
    GameFiles = UserInfo.allGames;
    if(GameFiles.length > 0){
        msg = "Here are your avaliable games: \n"
        for (i = 0; i < GameFiles.length; i++){
            msg = msg.concat(GameFiles[i], '\n');
        }
        return (msg);
    }
    else{
        return "You have no avaliable Games. Use the 'Create' command to upload one";
    }
}

function listChars(message,args){
    CharFiles = UserInfo.allChars;
    if(CharFiles.length > 0){
        msg = "Here are your avaliable characters: \n"
        for (i = 0; i < CharFiles.length; i++){
            msg = msg.concat(CharFiles[i], '\n');
        }
        return (msg);
    }
    else{
        return "You have no avaliable Characters. Use the 'Create' command to upload one";
    }
}
const Reader = require("../UserDataReader.js");

module.exports = {
    name:"select",
    description:"this allows you to select a character or game",
    enabled: true, // if false, command will not work
    execute(message,args){
        if(this.enabled){
            switch(args[1]){
                case "character":
                    if(args[2] == Reader.CurrentChar){
                        return "Character is already selected.";
                    }
                    else{
                        if(Reader.allChars.includes(args[2])){
                            Reader.CurrentChar = args[2];
                            return "Character " + args[2] + " is now selected.";
                        }
                        else{
                            return "Character doesn't exist. Please check spelling.";
                        }
                    }
                    break;
                case "game":
                    if(args[2] == Reader.CurrentGame){
                        return "Game is already selected.";
                    }
                    else{
                        if(Reader.allGames.includes(args[2])){
                            Reader.CurrentGame = args[2];
                            return "Game " + args[2] + " is now selected.";
                        }
                        else{
                            return "Game doesn't exist. Please check spelling.";
                        }
                    }
                    break;
                default:
                    return "What do you want to select? !select game/character";
                    break;
            }
        }
        else{
            return ("This command is currently DISABLED");
        }
    }
}
const Reader = require("../UserDataReader.js");

module.exports = {
    name:"select",
    description:"this allows you to select a character or game",
    enabled: true, // if false, command will not work
    execute(message,args){
        if(this.enabled){
            switch(args[1]){
                case "character":
                    return Reader.changeSelectedChar(message,args[2]);
                    break;
                case "game":
                    return Reader.changeSelectedGame(message,args[2])
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
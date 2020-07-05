const CharacterReader = require("../CharacterReader");

module.exports = {
    name:"select",
    description:"this allows you to select a character or game",
    enabled: true,
    execute(message,args){
        if(this.enabled){
            switch(args[1]){
                case "character":
                    return CharacterReader.ChangeChar(message,args);
                    break;
                case "game":
                    return game(message,args);
                    break;
                default:
                    return "What do you want to select? !select game/character";
                    break;
            }
        }
        else{
            return "This command is currently DISABLED";
        }
    }
}

function game(message,args){
    return "Not yet implemented. Coming soon"
}
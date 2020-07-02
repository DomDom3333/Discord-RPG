const CharacterReader = require("../CharacterReader");

module.exports = {
    name:"select",
    description:"this allows you to select a character or game",
    execute(message,args){
        switch(args[1]){
            case "character":
                return character(message,args);
                break;
            case "game":
                return game(message,args);
                break;
            default:
                return "What do you want to select? !select game/character";
                break;
        }
    }
}

function character(message,args){
    CharacterReader.ChangeChar(message,args);
}

function game(message,args){

}
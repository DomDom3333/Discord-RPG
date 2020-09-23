const Reader = require("../UserDataReader.js");
const Collector = require('../MessageCollector');

module.exports = {
    name:"select",
    description:"this allows you to select a character or game",
    enabled: true, // if false, command will not work
    execute(message,args){
        if(this.enabled){
            switch(args[1]){
                case "character":
                    if(args[2] == Reader.CurrentChar){
                        Collector.Add("Character is already selected.");
                    }
                    else{
                        if(Reader.allChars.includes(args[2])){
                            Reader.CurrentChar = args[2];
                            Collector.Add("Character " + args[2] + " is now selected.");
                        }
                        else{
                            Collector.Add("Character doesn't exist. Please check spelling.");
                        }
                    }
                    break;
                case "game":
                    if(args[2] === Reader.CurrentGame){
                        Collector.Add("Game is already selected.");
                    }
                    else{
                        if(Reader.allGames.includes(args[2])){
                            console.log(Reader.CurrentSID);
                            console.log(Reader.CurrentUID);
                            Reader.CurrentGame = args[2];
                            Reader.changeSelectedGame(message,args[2]);
                            Collector.Add('Game "' + args[2] + '" is now selected.');
                        }
                        else{
                            Collector.Add("Game doesn't exist. Please check spelling.");
                        }
                    }
                    break;
                default:
                    Collector.Add("What do you want to select? !select game/character");
                    break;
            }
        }
        else{
            Collector.Add("This command is currently DISABLED");
        }
    }
}
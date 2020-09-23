//This command is cdesigned to give the user info about an item like their currently selected character,game or other peoples characters or games.

//This is going to be a bitch isnt it......

const UserInfo = require("../UserDataReader.js");
const CharInfo = require("../CharacterReader.js");
const GameInfo = require("../GameFileReader.js");
const Collector = require('../MessageCollector');

module.exports = {
    name: 'view',
    description: "Views a property",
    enabled: true, // if false, command will not work
    execute(message,args){ //second argument tree
        if(this.enabled){
            switch (args[1]){
                case "current":
                    viewCurrent(message,args);
                    break;
                case "party":
                    viewParty(message,args);
                    break;
                default:
                    Collector.Add("Please state what you want to view (Current/Party)");
                }
        }
        else{
            Collector.Add("This command is currently DISABLED");
        }
    }
}

function viewCurrent(message,args){
    switch (args[2]){
        case "all":
            var CharName = UserInfo.getCharName(message,message.author.id);
            var CharID = UserInfo.getCharID();
            break;
        case "character":
            Collector.Add(viewCurrentCharacter(message,args));
            break;
        case "game":
            Collector.Add("This is the Game your current character is in.");
            break;
        default:
            Collector.Add("Please state what aspect you want to view (current character/game/all).");
    }
}

function viewParty(message,args){
    Collector.Add("Not yet implemented.");
}

function viewCurrentCharacter(message,args){
    if(args[3] != null){
        switch (args[3]){
            case "location":
                if(UserInfo.CurrentGame != ""){
                    if(UserInfo.CurrentChar != ""){
                        Collector.Add("You are at node number: " + GameInfo.currentNode + ", with the name: " + GameInfo.currentNode.nodeName);
                    }
                    else{
                        Collector.Add("You have no valid Character selected. Please use the 'select' command to select a character before using this command.");
                    }
                }
                else{
                    Collector.Add("You have no valid Game selected. Please use the 'select' command to select a game before using this command.");
                }
                break;
            case "name":
                Collector.Add(UserInfo.getCharName(message));
                break;
            case "id":
                Collector.Add(UserInfo.getCharID());
                break;
            case "level":
                Collector.Add(CharInfo.getCharLevel(message));
                break;
            case "type":
                Collector.Add("Coming soon");
                break;
            case "hp":
                Collector.Add("Coming soon");
                break;
            case "ac":
                Collector.Add("Coming soon");
                break;
            case "initiativemodifier":
                Collector.Add("Coming soon");
                break;
            case "initiativeadvantage":
                Collector.Add("Coming soon");
                break;
            case "speed":
                Collector.Add("Coming soon");
                break;
            case "all":
                //Here, grab all important data points an append them to fullText variable. Then return fullText.
                var fullText = "";
                fullText += ("Selected Character: " + UserInfo.getCharName(message,message.author.id) + "\n");
                //fullText += "Character ID: " + UserInfo.getCharID() + "\n";
                fullText += ("Active Game: " + UserInfo.getGame(message) + "\n");
                Collector.Add(fullText);
                break;
            default:
                Collector.Add("Please define what you would like to view about your current character (eg: 'Level').");

        }
    }
}

function addText(OriginalText, TextToAdd, AddLinebreak = true){
    if(AddLinebreak) {
        return OriginalText += TextToAdd + "\n";
    }
    else {
        return OriginalText += TextToAdd;
    }
}
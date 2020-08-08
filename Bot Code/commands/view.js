//This command is cdesigned to give the user info about an item like their currently selected character,game or other peoples characters or games.

//This is going to be a bitch isnt it......

const Reader = require("../UserDataReader");
const CharReader = require("../CharacterReader.js");

module.exports = {
    name: 'view',
    description: "Views a property",
    enabled: true, // if false, command will not work
    execute(message,args){ //second argument tree
        if(this.enabled){
            switch (args[1]){
                case "current":
                    return viewCurrent(message,args);
                    break;
                case "party":
                    return viewParty(message,args);
                    break;
                default:
                    return ("Please state what you want to view (Current/Party)");
                }
        }
        else{
            return ("This command is currently DISABLED");
        }
    }
}

function viewCurrent(message,args){
    switch (args[2]){
        case "all":
            var CharName = Reader.getCharName(message,message.author.id);
            var CharID = Reader.getCharID();
            break;
        case "character":
            return viewCurrentCharacter(message,args);
            break;
        case "game":
            return "This is the currrent Game your character is currently in.";
            break;
    }
}

function viewParty(message,args){
    return "Not yet implemented."
}

function viewCurrentCharacter(message,args){
    if(args[3] != null){
        switch (args[3]){
            case "name":
                return Reader.getCharName(message);
                break;
            case "id":
                return Reader.getCharID();
                break;
            case "level":
                return CharReader.getCharLevel(message);
                break;
            case "type":
                return "Coming soon";
                break;
            case "hp":
                return "Coming soon";
                break;
            case "ac":
                return "Coming soon";
                break;
            case "initiativemodifier":
                return "Coming soon";
                break;
            case "initiativeadvantage":
                return "Coming soon";
                break;
            case "speed":
                return "Coming soon";
                break;
            case "all":
                //Here, grab all important data points an append them to fullText variable. Then return fullText.
                var fullText = "";
                fullText += ("Selected Character: " + Reader.getCharName(message,message.author.id) + "\n");
                //fullText += "Character ID: " + Reader.getCharID() + "\n";
                fullText += ("Active Game: " + Reader.getGame(message) + "\n");
                return fullText;
                break;
            default:
                return "Please define what you would like to view about your current character (eg: 'Level') "

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
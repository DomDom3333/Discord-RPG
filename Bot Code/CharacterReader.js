const fs = require("fs");
const UserDataReader = require("./UserDataReader.js");
var charPath = "./Resources/Servers/0000/0001/Charfiles/samplechar.json"
var CharFile = parseJsonFile(charPath); //ALL SERVER AND USER DATA

module.exports = {

    name: CharFile.Name,
    level: CharFile.Level,
    currentNodeType: CharFile.CurrentNodeType,
    currentNode: CharFile.InGameLocation,

    readUser(message){
        loadNewCharFile(message)
    },
    getCharLevel(message){
        if(UserDataReader.CurrentChar != ""){
            loadNewCharFile(message);
            return CharFile.Level;
        }
        else{
            return "No character Selected."
        }
    },
    getCharInGameLocation(message){
        loadNewCharFile(message);
    }
}

function loadNewCharFile(message){
    charPath = getUserFile(message);
    CharFile = parseJsonFile(charPath);
}

function writeChanges(path = charPath, Data = CharFile){ //basically passes the current state of userData into the Json File and then re-reads it, thereby updating both states.
    console.log("Attempting to write . . .")
    fs.writeFileSync(path,JSON.stringify(Data));
    Data = parseJsonFile(Data);
}

function getUserFile(message){
    userID = message.author.id;
    serverID = message.guild.id;
    selectedChar = UserDataReader.getCurrentChar(serverID,userID);
    return charPath = "./Resources/Servers/" + serverID + "/" + userID + "/CharFiles/" + selectedChar;
}

function parseJsonFile(path){ //reads Json file and returns a single data object (userData) which contains all the Characterdata.
    var Data = fs.readFileSync(path);
    if (Data != null){
        JsonData = JSON.parse(Data);
        return JsonData;
    }
    else{
        console.log("----------------- FATAL ERROR READING FILE-----------------")
        console.log("File attempted to be read: "+ path);
        console.log("-----------------Exiting program!-----------------")
        process.exit(1); //exit in attempt to preserve remaining file integrity.
    }
}
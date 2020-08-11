const fs = require("fs");
const UserDataReader = require("./UserDataReader.js");
const { Console } = require("console");
var charPath = "./Resources/Servers/0000/0001/Charfiles/samplechar.json"
var CharFile = parseJsonFile(charPath); //ALL SERVER AND USER DATA

module.exports = {

    name: CharFile.Name,
    level: CharFile.Level,
    currentNodeType: CharFile.CurrentNodeType,
    currentNode: CharFile.InGameLocation,

    readUser(message){
        loadNewCharFile(message);
        
        this.name = CharFile.Name;
        this.level = CharFile.Level;
        this.currentNodeType = CharFile.CurrentNodeType;
        this.currentNode = CharFile.InGameLocation;
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
    },
    Save(){
        writeChanges();
    },
}

function loadNewCharFile(message){
    charPath = getUserFile(message);
    if(charPath != ""){
        CharFile = parseJsonFile(charPath);
    }
}

function writeChanges(path = charPath, Data = CharFile){ //basically passes the current state of userData into the Json File and then re-reads it, thereby updating both states.
    if(path != ''){
        try{
            console.log("Attempting to write to CharFile . . .")
            fs.writeFileSync(path,JSON.stringify(Data));
            Data = parseJsonFile(Data);
            console.log("Success writing to CharFile!");
        }
        catch(err){
            console.log("Something went wrong while writing to CharFile.")
        }
    }
    else{   
        console.log("No Char File to write to. Skipping . . .");
    }
}

function getUserFile(message){
    userID = message.author.id;
    serverID = message.guild.id;
    selectedChar = UserDataReader.CurrentChar;
    if(selectedChar != ""){
        return charPath = "./Resources/Servers/" + serverID + "/" + userID + "/CharFiles/" + selectedChar;
    }
    else{
        return "";
    }
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
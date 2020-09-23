//This Module is dedicated to opening, reading and retrieving data from a Gamefile. Data retrival functions should be handeld here.A lot of functions will be called from the DO command.

// -----------------------------------------------------------------------------------------------------------------------------------------------------------
const fs = require("fs");
const characterInfo = require("./CharacterReader.js");
const UserDataReader = require("./UserDataReader.js");
var gamePath = "./Resources/Servers/0000/0001/GameFiles/structureidea/structureidea.json"
//var GameFile = parseJsonFile(gamePath); //ALL SERVER AND USER DATA [DEPRECIATED]
var GameFile = require('../Resources/Servers/0000/0001/GameFiles/structureidea/structureidea.json');//All Game Data

module.exports = {
    currentNode: GameFile.Squares.G1x1.nodes[characterInfo.currentNodeType][characterInfo.currentNode],
    currentNodeName: GameFile.Squares.G1x1.nodes[characterInfo.currentNodeType][characterInfo.currentNode].NodeName,
    currentSearchText: GameFile.Squares.G1x1.nodes[characterInfo.currentNodeType][characterInfo.currentNode].LookText,

    updateGame(message){
        if(loadNewGameFile(message)){
            this.currentNode = GameFile.Squares.G1x1.nodes[characterInfo.currentNodeType][characterInfo.currentNode];
            this.currentNodeName = GameFile.Squares.G1x1.nodes[characterInfo.currentNodeType][characterInfo.currentNode].NodeName;
            this.currentSearchText = GameFile.Squares.G1x1.nodes[characterInfo.currentNodeType][characterInfo.currentNode].LookText;
        }
    },
    Save(){
        writeChanges();
    }
}

function loadNewGameFile(message){
    gamePath = getGameFile(message);
    if(gamePath != ""){
        GameFile = parseJsonFile(gamePath);
        return true;
    }
    else{
        return false;
    }
}
function getGameFile(message){
    userID = message.author.id;
    serverID = message.guild.id;
    selectedGame = UserDataReader.CurrentGame
    if(selectedGame != ""){
        return "./Resources/Servers/" + serverID + "/" + userID + "/GameFiles/" + selectedGame + "/" + selectedGame + '.json' ;
    }
    else{
        return "";
    }
}
function writeChanges(path = gamePath, Data = GameFile){ //basically passes the current state of userData into the Json File and then re-reads it, thereby updating both states.
    if(path != ''){
        try{
            console.log("Attempting to write to GameFile . . .");
            fs.writeFileSync(path,JSON.stringify(Data));
            Data = parseJsonFile(Data);
            console.log("Success writing to GameFile!");
        }
        catch(err){
            console.log("Something went wrong while writing to GameFile.")
        }
    }
    else{
        console.log("No Game File to write to. Skipping . . .");
    }
}
function parseJsonFile(path){ //reads Json file and returns a single data object (userData) which contains all the Game Data.
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
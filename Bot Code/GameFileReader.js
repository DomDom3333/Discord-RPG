//This Module is dedicated to opening, reading and retrieving data from a Gamefile. Data retrival functions should be handeld here.A lot of functions will be called from the DO command.

// -----------------------------------------------------------------------------------------------------------------------------------------------------------
const fs = require("fs");
const characterInfo = require("./CharacterReader.js");
const UserDataReader = require("./UserDataReader.js");
var gamePath = "./Resources/Servers/0000/0001/GameFiles/structureidea/structureidea.json"
var GameFile = parseJsonFile(gamePath); //ALL SERVER AND USER DATA



module.exports = {

    updateGame(message){
        console.log("Updating Game File to user: " + message.author.id);
        loadNewGameFile(message);
        console.log("New GameFile Path: " + gamePath);
    },
    currentNode: GameFile.Squares.G1x1.nodes[characterInfo.currentNodeType][characterInfo.currentNode],
    currentNodeName: GameFile.Squares.G1x1.nodes[characterInfo.currentNodeType][characterInfo.currentNode].nodeName,



}

function loadNewGameFile(message){
    gamePath = getGameFile(message);
    GameFile = parseJsonFile(gamePath);
}
function getGameFile(message){
    userID = message.author.id;
    serverID = message.guild.id;
    selectedGame = UserDataReader.CurrentGame
    return "./Resources/Servers/" + serverID + "/" + userID + "/GameFiles/" + selectedGame.substring(0,selectedGame.length-5) + "/" + selectedGame ;
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
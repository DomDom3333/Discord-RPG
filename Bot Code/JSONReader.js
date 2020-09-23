const fs = require("fs");
const userPath = "./Resources/UserData/user.json"
userData = parseJsonFile(userPath);
const Collector = require('../MessageCollector');

module.exports = {
        getCharName(message,userID){//pass in user id
            getCurrentCharName(serverID,userID)
        },
        changeSelectedChar(message,newCharName){
            var currentChar = getCurrentCharName(message.guild.id , message.author.id);
            var charExists = checkCharExists();
            if (currentChar == newCharName){
                Collector.Add("This character is already selected.");
            }
            else {
                setCurrentChar()
            }
        }
}

function getCurrentCharName(serverID,userID){//retrieve current char name from user ID and return it
    currentChar = getCurrentChar(serverID,userID,userData);
    if(currentChar!=""){
        charPath = "./Resources/Servers/"+serverID+"/"+userID+"/"+getCurrentUserCharName(serverID,userID)+"/"+currentChar;
    }
    else{
        Collector.Add("There is no character selected. Use '!Select Character' to select an existing character");
    }
    

    //console.log(Data.Servers[0]["724992148444938330"][0]["110596839018856448"].CurrentChar)//THIS WORKS!! Loop througha array points to eventually get to value?
    //console.log(Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentChar);//FUCK THIS LINE IN PATICULAR!!! Data.Servers.[Search].ID.[Search].ID.CurrentChar

};

function parseJsonFile(path){
    var Data = fs.readFileSync(path);
    Data = JSON.parse(Data);
    return Data;
}

//---------------------------------------------------------------------------------------------------------------------------------
//Checking Functions

function checkUserExists(serverID, userID, Data = userData){ //if attempt to access returns undefined/null, return false. False does not exist
    if(checkServerExists(serverID, userID, Data)){
        try{
            var checkThis = Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID];
            if (checkThis == null){
                return false;
            }
            else {
                return true;
            }
        }
        catch(err){
            Console.log("Crash while attempting to check User Existance", "color:red");
            Console.log("Command came from Server: " + serverID, "color:red");
            Console.log("Command came from user" + userID, "color:red");
        }
    }
}
function checkServerExists(serverID, userID, Data = userData){ //if attempt to access returns undefined/null, return false. False does not exist
    var checkThis = Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID];
    try{
        if (checkThis == null){
            return false;
        }
        else {
            return true;
        }
    }
    catch(err){
        Console.log("Crash while attempting to check Server Existance", "color:red");
        Console.log("Command came from Server: " + serverID, "color:red");
        Console.log("Command came from user" + userID, "color:red");
    }
}
function checkCharExists(serverID, userID,wantedChar){
    var charPath = "./Resources/Servers/" + serverID + "/" + userID + "/Charfiles" + wantedChar + ".json";
    if(fs.existsSync(charPath)){
        return true;
    }
    else{
        return false;
    }
}

//---------------------------------------------------------------------------------------------------------------------------------
//Getting Functions

function getCurrentChar(serverID, userID, Data = userData){
    if(checkUserExists){
        return (Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentChar);
    }
}
function getCurrentCharName(serverID, userID, Data = userData){
    return (Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentCharName);
}
function getCurrentGame (serverID, userID, Data = userData){
    return (Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentGame);
}

//---------------------------------------------------------------------------------------------------------------------------------
//Setting Functions

function setCurrentChar(serverID,userID,newChar){
    if(checkUserExists(serverID,userID)){
        if(checkCharExists(serverID,userID,newChar)){
            Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentChar = newChar;
        }
        else{
            return "The char you want to select, does not exist. Check spelling."
        }
    }
}
function setCurretnCharName(serverID,userID,newCharName){
    if(checkUserExists(serverID,userID)){
        Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentCharName = newCharName;
    }
}
function setCurrentGame(serverID,userID,newGame){
    if(checkUserExists(serverID,userID)){
        Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentGame = newGame;
    }
}
//Currently: TRYING to read nested objects from json file 
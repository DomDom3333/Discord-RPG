const fs = require("fs");
const userPath = "./Resources/UserData/user.json"
var userData = parseJsonFile(userPath); //ALL SERVER AND USER DATA
var currentServerID = "0000";
var currentUserID = "0001";

module.exports = {

    CurrentChar: userData.Servers[currentServerID][currentUserID].CurrentChar,
    CurrentCharName: userData.Servers[currentServerID][currentUserID].CurrentCharName,
    CurrentGame: userData.Servers[currentServerID][currentUserID].CurrentGame,

    updateIDs(message){
        currentServerID = message.guild.id;
        currentUserID = message.author.id;

    },

    checkExistance(message){
        if(checkServerExists(message.guild.id) && checkUserExists(message.guild.id,message.author.id)){
            return true;
        }
        else{
            return false;
        }
    },
    hasCharSelected(message){
        if(getCurrentChar(message.guild.ID, message.author.id) != ""){
            return true;
        }
        else{
            return false;
        }
    },
    getCharName(message){//pass in user id 
        return getCurrentCharName(message.guild.id,message.author.id)
    },
    getCurrentChar(serverID,userID){
        return getCurrentChar(serverID,userID);
    },
    getGame(message){
        return getCurrentGame(message.guild.id,message.author.id);
    },
    changeSelectedChar(message,newChar){
        var currentChar = getCurrentChar(message.guild.id , message.author.id);
        if (currentChar == newChar){
            return "This character is already selected";
        }
        else {
            return setCurrentChar(message.guild.id,message.author.id,newChar);
        }
    },
    changeSelectedGame(message, newGameName){
        var currentGame = getCurrentGame(message.guild.id , message.author.id);
        if (currentGame == newGameName){
            return "This Game is already selected";
        }
        else {
            return setCurrentGame(message.guild.id,message.author.id,newGameName);
        }        
    }
}

function parseJsonFile(path){ //reads Json file and returns a single data object (userData) which contains all the Server and user data.
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
function updateUserData(path = userPath, Data = userData){ //basically passes the current state of userData into the Json File and then re-reads it, thereby updating both states.
    console.log("Attempting to write . . .")
    fs.writeFileSync(path,JSON.stringify(Data));
    userData = parseJsonFile(userPath);
}
function addServer(serverID){ //adds new server to userData. Also calls for Refresh
    var serverObj = {[serverID]:[]};
    try{
        console.log("Adding new server: " + serverID);
        userData.Servers.push(serverObj);
        updateUserData(userPath,userData);
        console.log("Server added successfully");
        return true;
    }
    catch(err){
        console.log("Failed to add Server");
        return false;
    }
}
function addUser(userID,serverID){ //adds new user to userData. Also calls for Refresh
    var userobj = {[userID]:{userID:userID,CurrentChar:"",CurrentCharName:"",CurrentGame:""}};
    try{
        console.log("Adding new User: " + serverID);
        userData.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].push(userobj);
        updateUserData(userPath,userData);
        console.log("User added successfully");
        return true;
    }
    catch(err){
        console.log("Failed to add User");
        return false;
    }
}
//---------------------------------------------------------------------------------------------------------------------------------
//Checking Functions

function checkUserExists(serverID,userID, Data = userData){ //if attempt to access returns undefined/null, return false. False does not exist
    if(checkServerExists(serverID, Data)){
        try{
            if (Data.Servers[serverID][userID] == null){
                return addUser(userID,serverID);;
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
    else{
        return false;
    }
}
function checkServerExists(serverID, Data = userData){ //if attempt to access returns undefined/null, return false. False does not exist
    //var checkThis = Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID];
    try{
        if (Data.Servers[serverID] == null){
            return addServer(serverID);        
        }
        else {
            return true;
        }
    }
    catch(err){
        console.log("Crash while attempting to check Server Existance", "color:red");
        console.log("Command came from Server: " + serverID, "color:red");
        }
}
function checkCharExists(serverID, userID,wantedChar){
    var charPath = "./Resources/Servers/" + serverID + "/" + userID + "/Charfiles/" + wantedChar + ".json";
    if(fs.existsSync(charPath)){
        return true;
    }
    else{
        return false;
    }
}
function checkGameExists(serverID, userID,wantedGame){
    var gamePath = "./Resources/Servers/" + serverID + "/" + userID + "/GameFiles/" + wantedGame + ".json";
    if(fs.existsSync(gamePath)){
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
        return Data.Servers[serverID][userID].CurrentChar;
        //return (Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentChar);
    }
}
function getCurrentCharName(serverID, userID, Data = userData){
    console.log(Data.Servers[serverID]);
    return Data.Servers[serverID][userID].CurrentCharName;
}
function getCurrentGame(serverID, userID, Data = userData){
    if(checkUserExists(serverID,userID)){
        return Data.Servers[serverID][userID].CurrentGame;
       // return (Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentGame);
    }
}

/*function getCurrentID(){ DO NOT USE
    return (Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentGame)
}*/


//---------------------------------------------------------------------------------------------------------------------------------
//Setting Functions

function setCurrentChar(serverID,userID,newChar){
    if(checkCharExists(serverID,userID,newChar)){
        userData.Servers[serverID][userID].CurrentChar = (newChar + ".json");
        updateUserData();
        console.log("Selected character of " + userID + " updated successfully")
        return "Character Updated";
    }
    else{
        return "The char you want to select, does not exist. Check spelling."
    }
}
function setCurretnCharName(serverID,userID,newCharName){
    userData.Servers[serverID][userID].CurrentCharName = newCharName;
    updateUserData();
    console.log("Selected character name of: " + userID + " updated successfully")

}










//---------------------------------------------------------------------------------------------------------------------------------
//The following function is fucked. Its meant to Set the game after checking that this exists.I copied th code form the Char version and fucke dup. oops
/*function setCurrentGame(serverID,userID,newChar){
    if(checkCharExists(serverID,userID,newGame)){
        userData.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentGame = (newGame+ ".json");
        updateUserData();
        console.log("Selected Game of: " + userID + " updated successfully")
        return "Game Updated";
    }
    else{
        return "The game you want to select, does not exist. Check spelling."
    }
}*/


//---------------------------------------------------------------------------------------------------------------------------------
//Somehow this function exists twice and this version of it seems to do nothing...
/*function getCurrentCharName(serverID,userID){
    currentChar = getCurrentChar(serverID,userID,userData);
    if(currentChar!=""){
        charPath = "./Resources/Servers/"+serverID+"/"+userID+"/"+getCurrentUserCharName(serverID,userID)+"/"+currentChar;
    }
    else{
        return "There is no character selected. Use '!Select Character' to select an existing character";
    }
    

    console.log(userData.Servers[0]["724992148444938330"][0]["110596839018856448"].CurrentChar)//THIS WORKS!! Loop througha array points to eventually get to value?
    console.log(userData.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentChar);//FUCK THIS LINE IN PATICULAR!!! Data.Servers.[Search].ID.[Search].ID.CurrentChar

};*/


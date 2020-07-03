const fs = require("fs");
const userPath = "./Resources/UserData/user.json"
userData = parseJsonFile(userPath);

module.exports = {
        checkExistance(message,args){
            if(checkServerExists(message.guild.id) && checkUserExists(message.guild.id,message.author.id)){
                return true;
            }
            else{
                return false;
            }
        },
        createUser(message){
            serverID = message.guild.id;
            userID = message.author.id;
            var userobj = {[userID]:{userID:message.author.id,CurrentChar:"",CurrentCharName:"",CurrentGame:""}};
            try{
                userData.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].push(userobj);
                console.info(userData);
                returnJsonData(userPath,userData);
                console.log("UserData file updated");
                updateUserData();
                return "Successfully registerd you! Next up: Upload a character file!";
            }
            catch(err){
                console.log("Failed to update User Data file");
                return "Something went wrong while trying to create your user Profile";
            }
        },
        getCharName(message,userID){//pass in user id
            return getCurrentCharName(message.guild.id,userID)
        },
        changeSelectedChar(message,newCharName){
            var currentChar = getCurrentCharName(message.guild.id , message.author.id);
            var charExists = checkCharExists();
            if (currentChar == newCharName){
                return "This character is already selected"
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
        return "There is no character selected. Use '!Select Character' to select an existing character";
    }
    

    console.log(userData.Servers[0]["724992148444938330"][0]["110596839018856448"].CurrentChar)//THIS WORKS!! Loop througha array points to eventually get to value?
    console.log(userData.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentChar);//FUCK THIS LINE IN PATICULAR!!! Data.Servers.[Search].ID.[Search].ID.CurrentChar

};

function parseJsonFile(path){
    var Data = fs.readFileSync(path);
    if (Data != null){
        JsonData = JSON.parse(Data);
        return JsonData;
    }
    else{
        console.log("-----------------ERROR READING FILE-----------------")
        console.log("File attempted to be read: "+ path);
        console.log("-----------------Exiting program!-----------------")
        process.exit(1);
    }
}
function returnJsonData(path, Data){
    console.log("Attempting to write . . .")
    fs.writeFileSync(path,JSON.stringify(Data));
}
function updateUserData(){
    userData = parseJsonFile(userPath);
}

//---------------------------------------------------------------------------------------------------------------------------------
//Checking Functions

function checkUserExists(serverID,userID, Data = userData){ //if attempt to access returns undefined/null, return false. False does not exist
    if(checkServerExists(serverID, Data)){
        try{
            console.log(Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID)));
            var checkThis = Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID));
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
function checkServerExists(serverID, Data = userData){ //if attempt to access returns undefined/null, return false. False does not exist
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
            userData.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentChar = newChar;
        }
        else{
            return "The char you want to select, does not exist. Check spelling."
        }
    }
}
function setCurretnCharName(serverID,userID,newCharName){
    if(checkUserExists(serverID,userID)){
        userData.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentCharName = newCharName;
    }
}
function setCurrentGame(serverID,userID,newGame){
    if(checkUserExists(serverID,userID)){
        userData.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentGame = newGame;
    }
}
//Currently: TRYING to read nested objects from json file 
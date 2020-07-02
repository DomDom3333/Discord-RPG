const fs = require("fs");
const { Console } = require("console");
const userPath = "./Resources/UserData/user.json"
module.exports = {
        getCharName(message,userID){//pass in user id
            return getCurrentCharName(serverID,userID)
        }
}

function getCurrentCharNamea(serverID,userID){//retrieve current char name from user ID and return it
    //serverID = "724992148444938330"
    //userID = "110596839018856448"
    userData = parseJsonFile(userPath);



    currentChar = getCurrentChar(serverID,userID,userData);
    if(currentChar!=""){
        charPath = "./Resources/Servers/"+serverID+"/"+userID+"/"+getCurrentUserCharName(serverID,userID)+"/"+currentChar;
    }
    else{
        return "There is no character selected. Use '!Select Character' to select an existing character";
    }
    

    console.log(Data.Servers[0]["724992148444938330"][0]["110596839018856448"].CurrentChar)//THIS WORKS!! Loop througha array points to eventually get to value?
    console.log(Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentChar);//FUCK THIS LINE IN PATICULAR!!! Data.Servers.[Search].ID.[Search].ID.CurrentChar

};

function parseJsonFile(path){
    var Data = fs.readFileSync(path);
    Data = JSON.parse(Data);
    return Data;
}

function checkUserExists(serverID, userID, Data = parseFile(userPath)){ //if attempt to access returns undefined/null, return false. False does not exist
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

function checkServerExists(serverID, userID, Data = parseFile(userPath)){ //if attempt to access returns undefined/null, return false. False does not exist
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

function getCurrentChar(serverID, userID, Data = parseFile(userPath)){
    if(checkUserExists){
        return (Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentChar);
    }
}

function getCurrentCharName(serverID, userID, Data = parseFile(userPath)){
    return (Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentCharName);
}

function getCurrentGame (serverID, userID, Data = parseFile(userPath)){
    return (Data.Servers.find(itm => Object.keys(itm).includes(serverID))[serverID].find(usr => Object.keys(usr).includes(userID))[userID].CurrentGame);
}


//Currently: TRYING to read nested objects from json file 
//Dedicated command to register a new user and server. Unlikely to be used for release version but helpful for development.

const Reader = require("../UserDataReader.js"); 

module.exports = {
    name: "register",
    description: "This command creates a user account for the sender fo the command",
    execute(message,args){
        if (Reader.checkExistance(message,args)){
            return "You are registerd";
        }
        else {
            return "You remain un-registerd";
        }
    }
}
const Reader = require("../UserDataReader.js"); 

module.exports = {
    name: "register",
    description: "This command creates a user account for the sender fo the command",
    execute(message,args){
        if (Reader.checkExistance(message,args)){
            return "You already have already registerd";
        }
        else {
            return Reader.createUser(message);
        }
    }
}
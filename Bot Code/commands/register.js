//Dedicated command to register a new user and server. Unlikely to be used for release version but helpful for development.
const Collector = require('../MessageCollector');
const Reader = require("../UserDataReader.js"); 

module.exports = {
    name: "register",
    description: "This command creates a user account for the sender fo the command",
    enabled: true, // if false, command will not work
    execute(message,args){ //second argument tree
        if(this.enabled){
            if (Reader.checkExistance(message,args)){
                Collector.Add("You are registerd");
            }
            else {
                Collector.Add("You remain un-registerd");
            }
        }
        else{
            Collector.Add("This command is currently DISABLED");
        }
    }
}
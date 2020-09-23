//NOT YET IMPLEMENTED. mOSTLY PLACEHOLDER MODULE
const Collector = require('../MessageCollector');

module.exports = {
    name: 'leave',
    description: "Leaves a Party or a Game",
    enabled: true, // if false, command will not work
    execute(message,args){ //second argument tree
        if(this.enabled){
            switch (args[1]){
                case "game":
                    leaveGame(message,args);
                    break;
                case "party":
                    leaveParty(message,args);
                    break;
                default:
                    Collector.Add("Please state what you want to leave (Party/Game)");
                }
        }
        else{
            Collector.Add("This command is currently DISABLED");
        }
    }
}

function leaveParty(message,args){ //leaves a party (not yet implimented)
    Collector.Add("Not yet Implemented");
}

function leaveGame(message,args){ //leaves a game (not yet implimented)
    Collector.Add("Not yet Implemented");
}
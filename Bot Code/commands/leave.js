//NOT YET IMPLEMENTED. mOSTLY PLACEHOLDER MODULE


module.exports = {
    name: 'leave',
    description: "Leaves a Party or a Game",
    enabled: true, // if false, command will not work
    execute(message,args){ //second argument tree
        if(this.enabled){
            switch (args[1]){
                case "game":
                    return leaveGame(message,args);
                    break;
                case "party":
                    return leaveParty(message,args);
                    break;
                default:
                    return ("Please state what you want to leave (Party/Game)");
                }
        }
        else{
            return "This command is currently DISABLED"
        }
    }
}

function leaveParty(message,args){ //leaves a party (not yet implimented)
    return ("Not yet Implemented");
}

function leaveGame(message,args){ //leaves a game (not yet implimented)
    return ("Not yet Implemented");
}
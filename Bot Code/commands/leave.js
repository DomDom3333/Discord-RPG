module.exports = {
    name: 'leave',
    description: "Leaves a Party or a Game",
    execute(message,args){ //second argument tree
        if(args[1] === "party"){
            return leaveParty(message,args);
        }
        else if(args[1] === "game"){
            return leaveGame(message,args);
        }
        else{
            return ("Please state what you want to leave (Party/Game)");
        }
    }
}

function leaveParty(message,args){ //leaves a party (not yet implimented)
    return ("You have left the party");
}

function leaveGame(message,args){ //leaves a game (not yet implimented)
    return ("You have left the Game");
}
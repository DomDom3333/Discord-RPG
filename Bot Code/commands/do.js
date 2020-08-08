//This Module will be dedicatd for the first steps of the game logic. This will parse the command to shoot to the according functions. Will likely read the Game Json from here.

const UserReader = require("../UserDataReader.js");
const CharacterReader = require("../CharacterReader.js");
const GameReader = require("../GameFileReader.js");
const GameMaster = require("../GameMaster.js");

module.exports = {
    name:"do",
    description:"This is the main game interaction menu",
    enabled: true, // if false, command will not work
    execute(message,args){
        if(this.enabled){
            switch(args[1]){
                case "walk":
                    return walk(message,args);
                    break;
                case "climb":
                    return climb(message,args);
                    break;
                case "push":
                    return push(message,args);
                    break;
                case "search":
                    return search(message,args);
                    break;
                default:
                    return "Not Yet Implemented";
                    return "Please describe what you would like to do";
            }
        }
        else{
            return ("This command is currently DISABLED")
        }
    }
}

function walk(message,args){
    zxy = CharacterReader.name;
    //So lets do this mess then
    console.log(GameReader.currentNode.ExitPoints);
    var targetObject = GameReader.currentNode.ExitPoints[args[2]]
    if(targetObject != null){
        if(targetObject.VisibleBeforeUnlock == "True"){
            if(targetObject.Locked == "False"){
                if(targetObject.Interact_Types.onWalk != null){
                    if(targetObject.Interact_Types.onWalk.GoTo != ""){
                        GameMaster.changeLocation(message)
                    }
                    return targetObject.Interact_Types.onWalk.Response;
                }
                else{
                    return "You can't " + args[1] + " this " + args[2] + ".";
                }
            }
            else{
                return "This " + args[2] + " is locked."
            }
        }
        else{
            return "There is no " + args[2] + " you can see.";
        }
    }
    else{
        return "There is no '" + args[2] + "' you can see.";
    }
}
function climb(message,args){
    zxy = CharacterReader.name;
    //So lets do this mess then
    console.log(GameReader.currentNode.ExitPoints);
    var targetObject = GameReader.currentNode.ExitPoints[args[2]]
    if(targetObject != null){
        if(targetObject.VisibleBeforeUnlock == "True"){
            if(targetObject.Locked == "False"){
                if(targetObject.Interact_Types.onClimb != null){
                    return targetObject.Interact_Types.onClimb.Response;
                }
                else{
                    return "You can't " + args[1] + " this " + args[2] + ".";
                }
            }
            else{
                return "This " + args[2] + " is locked.";
            }
        }
        else{
            return "There is no " + args[2] + " you can see.";
        }
    }
    else{
        return "There is no " + args[2] + " you can see.";
    }
}
function push(message,args){
    var targetObject = GameReader.currentNode.ExitPoints[args[2]]
    if(targetObject != null){
        if(targetObject.VisibleBeforeUnlock == "True"){
            if(targetObject.Locked == "False"){
                if(targetObject.Interact_Types.onPush != null){
                    return targetObject.Interact_Types.onPush.Response;
                }
                else{
                    return "You can't " + args[1] + " this " + args[2] + ".";
                }
            }
            else{
                return "This " + args[2] + " is locked.";
            }
        }
        else{
            return "There is no " + args[2] + " you can see.";
        }
    }
    else{
        return "There is no " + args[2] + " you can see.";
    }
}
function search(message,args){
    //contact character and have it return its location
    //contact world and return options
    //pass options to story module
    return "You have Searched";
}
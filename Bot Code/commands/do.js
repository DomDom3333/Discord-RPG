//This Module will be dedicatd for the first steps of the game logic. This will parse the command to shoot to the according functions. Will likely read the Game Json from here.

const UserReader = require("../UserDataReader.js");
const CharacterReader = require("../CharacterReader.js");
const GameReader = require("../GameFileReader.js");
const GameMaster = require("../GameMaster.js");
const Collector = require('../MessageCollector.js');

module.exports = {
    name:"do",
    description:"This is the main game interaction menu",
    enabled: true, // if false, command will not work
    execute(message,args){
        if(this.enabled){
            if(UserReader.CurrentGame != ''){
                switch(args[1]){
                    case "walk":
                        walk(message,args);
                        break;
                    case "climb":
                        climb(message,args);
                        break;
                    case "push":
                        push(message,args);
                        break;
                    case "search":
                        search(message,args);
                        break;
                    default:
                        Collector.Add("Please describe what you would like to do");
                }
            }
            else{
                Collector.Add("Please select a game before using this command.");
            }
        }
        else{
            Collector.Add("This command is currently DISABLED");
        }
    }
}

function walk(message,args){
    zxy = CharacterReader.name;
    //So lets do this mess then
    console.log(GameReader.currentNode.ExitPoints);
    var targetObject = GameReader.currentNode.ExitPoints[args[2]]
    if(args[2]==null){
        Collector.Add('Where do you want to walk to? Use "search" to see whats around you.');
    }
    else if(targetObject != null){
        if(targetObject.VisibleBeforeUnlock == "True"){
            if(targetObject.Locked == "False"){
                if(targetObject.Interact_Types.onWalk != null){
                    if(targetObject.Interact_Types.onWalk.GoTo != ""){
                        GameMaster.changeLocation(message)
                    }
                    Collector.Add(targetObject.Interact_Types.onWalk.Response); //pulls response from the object to walking to it from the game file
                }
                else{
                    Collector.Add("You can't " + args[1] + " this " + args[2] + ".");
                }
            }
            else{
                Collector.Add("This " + args[2] + " is locked.");
            }
        }
        else{
            Collector.Add("There is no " + args[2] + " you can see.");
        }
    }
    else{
        Collector.Add("There is no '" + args[2] + "' you can see.");
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
                    Collector.Add(targetObject.Interact_Types.onClimb.Response);
                }
                else{
                    Collector.Add("You can't " + args[1] + " this " + args[2] + ".");
                }
            }
            else{
                Collector.Add("This " + args[2] + " is locked.");
            }
        }
        else{
            Collector.Add("There is no " + args[2] + " you can see.");
        }
    }
    else{
        Collector.Add("There is no " + args[2] + " you can see.");
    }
}
function push(message,args){
    var targetObject = GameReader.currentNode.ExitPoints[args[2]]
    if(targetObject != null){
        if(targetObject.VisibleBeforeUnlock == "True"){
            if(targetObject.Locked == "False"){
                if(targetObject.Interact_Types.onPush != null){
                    Collector.Add(targetObject.Interact_Types.onPush.Response);
                }
                else{
                    Collector.Add("You can't " + args[1] + " this " + args[2] + ".");
                }
            }
            else{
                Collector.Add("This " + args[2] + " is locked.");
            }
        }
        else{
            Collector.Add("There is no " + args[2] + " you can see.");
        }
    }
    else{
        Collector.Add("There is no " + args[2] + " you can see.");
    }
}
function search(message,args){
    //contact character and have it return its location
    //contact world and return options
    //pass options to story module
    Collector.Add(GameReader.currentSearchText);
}
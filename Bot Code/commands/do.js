//This Module will be dedicatd for the first steps of the game logic. This will parse the command to shoot to the according functions. Will likely read the Game Json from here.

const Reader = require("../UserDataReader.js");

module.exports = {
    name:"do",
    description:"This is the main game interaction menu",
    enabled: true, // if false, command will not work
    execute(message,args){
        if(enabled){
            switch(args[1]){
                case "walk":
                    return walk(message,args);
                    break;
                case "push":
                    return push(message,args);
                    break;
                case "search":
                    return search(message,args);
                    break;
            }
        }
        else{
            return ("This command is currently DISABLED")
        }
    }
}

function walk(message,args){
    xyz = Reader.getCharName(message ,message.author.id);
    //contact character and have it return its location
    //contact world and return options
    //pass options to story module
    return "You have walked to " + xyz;
}

function push(message,args){
    //contact character and have it return its location
    //contact world and return options
    //pass options to story module
    return "You have Pushed";
}

function search(message,args){
    //contact character and have it return its location
    //contact world and return options
    //pass options to story module
    return "You have Searched";
}
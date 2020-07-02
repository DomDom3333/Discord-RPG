const Character = require("../CharacterReader.js");

module.exports = {
    name:"do",
    description:"This is the main game interaction menu",
    execute(message,args){
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
}

function walk(message,args){
    xyz = Character.loaction(message,args);
    //contact character and have it return its location
    //contact world and return options
    //pass options to story module
    return "You have walked to " + xyz;
}

function push(message,args){
    //contact character and have it return its location
    //contact world and return options
    //pass options to story module
    return "You have Pushed"
}

function search(message,args){
    //contact character and have it return its location
    //contact world and return options
    //pass options to story module
    return "You have Searched"
}
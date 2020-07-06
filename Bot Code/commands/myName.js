module.exports = { //Debugging command to test BASIC functionality
    name: 'myname',
    description: "says your name",
    execute(message,args){
        return ("Your name is: " + message.author.toString());
    }
}
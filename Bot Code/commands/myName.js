module.exports = {
    name: 'myname',
    description: "says your name",
    execute(message,args){
        return ("Your name is: " + message.author.toString());
    }
}
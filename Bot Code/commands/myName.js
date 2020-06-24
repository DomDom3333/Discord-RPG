module.exports = {
    name: 'myname',
    description: "says your name",
    execute(message,args){
        message.channel.send("Your name is: " + message.author.toString());
    }
}
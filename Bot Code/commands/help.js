module.exports = {
    name: 'help',
    description: "lists all avaliable commands",
    execute(message,args){
        message.channel.send('This is a full map of the planned commands.' , {files: ["./Resources/Images/commandMap.png"]});
    }
}
//Janky help command

module.exports = {
    name: 'help',
    description: "lists all avaliable commands",
    execute(message,args){
        return ('This is a full map of the planned commands.' , {files: ["./Resources/Images/commandMap.png"]});
    }
}
module.exports = { //Debugging command to test BASIC functionality
    name: 'myname',
    description: "says your name",
    enabled: true, //if false, command will not work
    execute(message,args){
        if(this.enabled){
            Collector.Add("Your name is: " + message.author.toString());
        }
        else{
            Collector.Add("This command is currently DISABLED");
        }
    }
}
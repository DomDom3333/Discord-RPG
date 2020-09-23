const Collector = require('../MessageCollector');

module.exports = {
    name: 'ping',
    description: "says pong!",
    enabled: true, //if false, command will not work
    execute(message,args){
        if(this.enabled){
            Collector.Add('pong');
        }
        else{
            Collector.Add("This command is currently DISABLED");
        }
    }
}
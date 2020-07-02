module.exports = {
    name: 'ping',
    description: "says pong!",
    execute(message,args){
        return('pong');
    }
}
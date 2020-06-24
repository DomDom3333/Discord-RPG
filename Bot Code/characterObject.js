module.exports = {
    name: '',
    gender: '',
    race:'',
    stats:'',
    load(message,args){
        loadChar(message,args);
    }
}

function save(message,args){
    JSON.stringify()
}
function loadChar(message,args){
    var dir = './Resources/Servers/' + message.guild.id + '/' + message.author.id + '/CharFiles/' // + character/filename
}


//This file is not yet in use. This will be used for opening, saving and editing character files
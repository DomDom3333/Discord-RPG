//This Module collects all message that need to be  sent to the player and agregates them into a single message. When the Return function is called, they are returned back for sending.

// -----------------------------------------------------------------------------------------------------------------------------------------------------------
var messageSoFar = '';


module.exports = {

    Add(textToAdd){
        messageAdder(textToAdd);
    },
    Return(){
        return messageSoFar;
    },
    Clear(){
        messageSoFar = '';
    }
}

function messageAdder(textToAdd){
    if(textToAdd){ //check for content (due to JS, if there is ANYTHING in the string, it will return true since the binary value is more than 1.)
        return messageSoFar += textToAdd + '\n';
    }
    else{
        console.log('Empty message was submitted to the Message collector.');
    }
}
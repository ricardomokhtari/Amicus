// Client.js is initialised once the HTML file is loaded by the client.


$(document).ready(() => {
    console.log("Document loaded");
    // This initiates the 'Recording' class 
    const audio_pipe = new Audio_Pipe();
    // This links the button object in index.html to the function audio_pipe.start() - look at Utils.js
    $('#Start_Recording').on('click', () => {
        audio_pipe.start();
    });
    // This links the button object in index.html to the function audio_pipe.stop() - look at Utils.js
    $('#Stop_Recording').on('click', () => {
        audio_pipe.stop();
        console.log(audio_pipe._wavBuffer);
  
    });

    $(window).on('beforeunload', () => {
        console.log("Closing");
    });
});
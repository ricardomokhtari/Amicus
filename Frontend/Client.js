// Client.js is initialised once the HTML file is loaded by the client.

/* 
The $ is a sign that jquery is being used. This first line essentially means once the html has
been loaded this script will be run. This script is linked to the html by:
<script src="xxx.js"></script>
*/
$(document).ready(() => {
    console.log("Document loaded");
    // This initiates the 'Recording' class 
    const audio_pipe = new Audio_Pipe();
    // This links the button object in index.html to the function recording.start() - look at Utils.js
    $('#Start_Recording').on('click', () => {
        audio_pipe.start();
    });
    // This links the button object in index.html to the function recording.stop() - look at Utils.js
    $('#Stop_Recording').on('click', () => {
        audio_pipe.stop();

        $.post('http://localhost:8080', 
                audio_pipe._wavBuffer);
            
    });

    $(window).on('beforeunload', () => {
        console.log("Closing");
    });
});
// Client.js is initialised once the HTML file is loaded by the client.

$(document).ready(() => {
    console.log("Document loaded");

    const recording = new Recording();
    $('#Start_Recording').on('click', () => {
        // Starting ASR connection with two parameters. asrConfig is the configuration for the connection. asrCallback is how we handle ASR results
        recording.start();
    });

    $('#Stop_Recording').on('click', () => {
        // Starting ASR connection with two parameters. asrConfig is the configuration for the connection. asrCallback is how we handle ASR results
        recording.stop();
    });

    $(window).on('beforeunload', () => {
        console.log("Closing");
    });
});
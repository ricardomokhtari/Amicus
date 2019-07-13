// Client.js is initialised once the HTML file is loaded by the client.

$(document).ready(() => {
    console.log("Document loaded");

    const recording = new Recording();
    $('#Start_Recording').on('click', () => {
        recording.start();
    });

    $('#Stop_Recording').on('click', () => {
        recording.stop();
    });

    $(window).on('beforeunload', () => {
        console.log("Closing");
    });
});
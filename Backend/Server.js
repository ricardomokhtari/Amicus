var http = require('http');
var fs = require('fs');
const WaveFile = require('wavefile');


// Creating httpServer
var server = http.createServer();

console.log("Server Active");

var audio_array = [];

// Once HTTP is connected do function
server.on('request', function(req, res) {
    console.log("-- Request Received --");
    if (req.method == 'POST') {
        req.on('data', function(msg) {

            var datas = [];

            if (msg.toString() == 404) {

                let wav = new WaveFile();
                // console.log(audio_array.length);
                // wav.fromScratch(1, 44100, '32f', audio_array);
                // fs.writeFileSync('Audio/Test.wav', wav.toBuffer());

            } else {
                msg = msg.toString();
                msg = msg.replace((/(\n|\r)/g, '0'));
                // console.log(msg);

                data = msg.split(",");
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    datas.push(data[i]);
                    }

                // console.log(datas.length)
                audio_array.push(new Float32Array(datas));

            }
        // POST is ended 
        }).on('error', function(error) {
            console.log(error.stack);
        });

        // Need to set 'res' parameters, so HTTP server doesn't freeze. 
        res.on('error', function(error) {
            console.log(error);
        });
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', "*" );
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.end();
        
    };
});

server.listen(8080);
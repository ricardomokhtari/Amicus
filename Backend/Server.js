var http = require('http');

// Creating httpServer
var server = http.createServer();

console.log("Server Active");

// Once HTTP is connected do function
server.on('request', function(req, res) {
    console.log("received request");
    if (req.method == 'POST') {
        req.on('data', function(msg) {
            console.log(msg);
        // POST is ended 
        }).on('error', function(error) {
            console.log(error.stack)
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
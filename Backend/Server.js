const http = require('http')
const { spawn } = require('child_process')

var server = http.createServer(function(req, res) {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');

    let data = []

    req.on('data', function(chunk) {
        data.push(chunk)
    });

    req.on('end', function() {
        console.log("HTTP GET received")
        data = JSON.parse(data.toString())
        console.log("JSON: " + data.user_input)

        // data = {response: "long string response"}
        const process = spawn('python', ['./Chatbot.py', data.user_input]);
        var script_output = []
        process.stdout.on('data', (data) => {
            console.log("(python) stdout: " + data.toString())
            script_output.push(data.toString())
        });
    
        process.stderr.on('data', (data) => {
            script_output.push(data)
        });
        process.on('exit', (code, signal) => {
            res.writeHead(200, {'x-success': 'OK'});
            for (let i = 0; i < script_output.length; i++) {
                res.write(script_output[i])
            }
            res.end();
          });
    });

}).on('error', (error) => {
    console.error(error)
}).listen(8080)
// server.timeout = 100
var restify = require('restify');
var robot = require("robotjs");
const fs = require('fs');

function pixelWebView(req, res, next) {

    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            next(err);
            return;
        }
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Access-Control-Allow-Origin', '"*"');
        res.writeHead(200);
        res.end(data);
        next();
    });

}



function pixelData(req, res, next) {
    var mousePos = robot.getMousePos();
    var img = robot.screen.capture(mousePos.x, mousePos.y, 10, 10);
    var response = [];

    for (var i =0;i<img.width;i++){
        var item = [];
        for (var j=0;j<img.height;j++){
            var colorHex = img.colorAt(i, j);
            item.push(colorHex);
        }
        response.push(item);
    }
    res.send(response);


    next();
}

var server = restify.createServer();

server.get('/', pixelWebView);
server.get('/data', pixelData);


server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
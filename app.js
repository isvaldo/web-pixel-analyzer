var restify = require('restify');
const fs = require('fs');

function pixelWebView(req, res, next) {

    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            next(err);
            return;
        }
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(data);
        next();
    });

}

function pixelData(req, res, next) {
    next();
}

var server = restify.createServer();

server.get('/', pixelWebView);
server.get('/data', pixelData);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
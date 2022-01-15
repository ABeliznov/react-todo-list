const fs = require("fs");

const page404 = (res, req) => {
    res.statusMessage = 'Not Found';
    res.writeHead(404, {
        'Content-Type': 'text/html'
    })
    res.end('Page Not Found');
}

const staticFile = (ext, res, req) => {
    let route = req.url.split('?')[0];
    let staticPath = '/static' + route;

    switch(ext)
    {
        case '.css':
            res.writeHead(200, {"Content-Type": "text/css"});
            fs.readFile('./' + staticPath, 'utf8', function(err, fd) {
                res.end(fd);
            });
            break;
        case '.js':
            res.writeHead(200, {"Content-Type": "text/javascript"});
            fs.readFile('./' + staticPath, 'utf8', function(err, fd) {
                res.end(fd);
            });
            break;
    }
}


module.exports = {
    page404,
    staticFile
}
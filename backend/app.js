const http = require('http');
const qs = require('querystring');
const {stringify} = require('./helpers');
const ToDoController = require('./controllers/TodoController');
const {db} = require('./database');
const fs = require('fs');
const path = require('path');
const url = require('url');


const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;


    let route = req.url.split('?')[0];
    let staticPath = '/static' + route;
    let ext = path.extname(route);
    let method = req.method;

    if( route.match(/\/api\/todo\//) )
    {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "*");

        if ( req.method === 'OPTIONS' ) {
            res.statusCode = 204;
            res.end();
        }

        let todo = new ToDoController();
        let url_var = route.match(/\/api\/todo\/(\d+)\/?$/);

        if (route.match(/\/api\/todo\/?$/))
        {

            if (method === 'POST')
            {
                todo.add(req, res);
            }
            else if(method === 'GET' )
            {
                todo.get_all(req, res);
            }
            else
            {
                res.statusCode = 404;
                res.statusMessage = 'Not Found';
                res.end(stringify({status: 0}));
            }
        }
        else if( !!url_var[1] )
        {
            let id  = url_var[1];
            if(method === 'PUT')
            {
                todo.fetch(id).then(result => {

                    if( result )
                        todo.update(id, req, res);
                    else
                        res.end(stringify({status: 0}));
                })

            }
            else if(method === 'DELETE')
            {

                todo.fetch(id).then((result) => {

                    if( result )
                        todo.delete(id, req, res);
                    else
                        res.end(stringify({status: 0}));

                });
            }
            else
            {
                res.statusCode = 404;
                res.statusMessage = 'Not Found';
                res.end(stringify({status: 0}));
            }
        }
    }
    else if( route === '/' )
    {
        const build = fs.readFileSync(path.resolve('static', 'index.html'));
        res.setHeader('Content-Type', 'text/html');
        res.end(build);
    }
    else
    {
        if( ext === '.js' || ext === '.css' )
        {
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
        else
        {
            res.statusCode = 404;
            res.statusMessage = 'Not Found';
            res.end('404 Page Not Found');
        }

    }
});
server.listen(PORT);


process.on('SIGINT', () => {
    db.close();
    server.close();
});

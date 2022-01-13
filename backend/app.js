const http = require('http');
const qs = require('querystring');
const {stringify} = require('./helpers');
const ToDoController = require('./controllers/TodoController');
const {db} = require('./database');
const fs = require('fs');
const path = require('path');
const url = require('url');


const PORT = process.env.PORT || 3000;

function handleStaticPages(pathName, res) {
    let ext = path.extname(pathName);
    switch(ext) {
        case '.css':
            res.writeHead(200, {"Content-Type": "text/css"});
            fs.readFile('./' + pathName, 'utf8', function(err, fd) {
                res.end(fd);
            });
            console.log('Routed for Cascading Style Sheet '+ pathName +' Successfully\n');
            break;
        case '.js':
            res.writeHead(200, {"Content-Type": "text/javascript"});
            fs.readFile('./' + pathName, 'utf8', function(err, fd) {
                res.end(fd);
            });
            console.log('Routed for Javascript '+ pathName +' Successfully\n');
            break;
    }
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;

    if ( req.method === 'OPTIONS' ) {
        res.writeHead(200);
        res.end();
        return;
    }

    let route = req.url.split('?')[0];
    let method = req.method;


    if( route.match(/\/api\/todo\//) )
    {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "*");

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
                todo.fetch(id, (result) => {

                    if( result )
                        todo.update(id, req, res);
                    else
                        res.end(stringify({status: 0}));

                });
            }
            else if(method === 'DELETE')
            {
                todo.fetch(id, (result) => {

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
        const build = fs.readFileSync(path.resolve('..', 'dist', 'index.html'));
        res.setHeader('Content-Type', 'text/html');
        res.end(build);
    }
    else {

        let ext = path.extname(route);
        let pathName = url.parse(route).pathname;
        if( ext === '.js' || ext === '.css' )
        {
            handleStaticPages(pathName, res);
        }
        else
        {
            res.statusCode = 404;
            res.statusMessage = 'Not Found';
            res.end(stringify({status: 0}));
        }

    }
});
server.listen(PORT);


process.on('SIGINT', () => {
    db.close();
    server.close();
});

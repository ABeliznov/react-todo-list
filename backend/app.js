const http = require('http');
const qs = require('querystring');
const {stringify} = require('./helpers');
const ToDoController = require('./controllers/TodoController');
const {db} = require('./database');
const fs = require('fs');
const path = require('path');
const url = require('url');
const {page404, staticFile} = require("./routing");


const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;


    let route = req.url.split('?')[0];
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
                page404(res, req);
            }
        }
        else if( !!url_var[1] )
        {
            let id  = url_var[1];
            if(method === 'PUT')
            {
                todo.update(id, req, res);
            }
            else if(method === 'DELETE')
            {
                todo.delete(id, req, res);
            }
            else
            {
                page404(res, req);
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
            staticFile(ext, res, req)
        }
        else
        {
            page404(res, req);
        }

    }
});
server.listen(PORT);


process.on('SIGINT', () => {
    db.close();
    server.close();
});

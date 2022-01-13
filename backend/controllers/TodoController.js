const ToDoModel = require('../models/TodoModel');
const {stringify} = require('../helpers')
const qs = require("querystring");

const model = new ToDoModel();

class TodoController
{
    add(req, res)
    {
        let body = '';
        req.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                req.connection.destroy();
        });

        req.on('end', () => {
            let post = qs.parse(body);
            if( !!post.task )
            {
                model.add(post.task, (result) => {
                    if( result )
                        res.end(stringify({'status': 1}));

                    res.end(stringify({'status': 0}));
                })
            }
        })
    }

    fetch(id, callback)
    {
        model.fetch(id, (result) => {

            callback(result)

        })
    }

    get_all(req, res)
    {
        model.get_all((result) => {



            if( result )
                res.end(stringify({status: 1, data: result}));
            res.end(stringify({status: 0}));
        });
    }

    delete(id, req, res)
    {
        model.delete(id, (result) => {
            if( result )
                res.end(stringify({status: 1}));
            else
                res.end(stringify({status: 0}));
        })
    }

    update(id, req, res)
    {

        let body = '';
        req.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                req.connection.destroy();
        });

        req.on('end', () => {
            let post = qs.parse(body);

            if( !!post.completed )
            {
                let fields = {
                    'completed' : post.completed
                }
                model.update(id, fields,(result) => {
                    if( result )
                        res.end(stringify({status: 1}));
                    else
                        res.end(stringify({status: 0}));
                })
            }
            else
            {
                res.end(stringify({status: 0}));
            }
        })

    }
}

module.exports = TodoController;
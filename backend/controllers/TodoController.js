const ToDoModel = require('../models/TodoModel');
const {stringify, getPostData} = require('../helpers')
const qs = require("querystring");

const model = new ToDoModel();

class TodoController {
    add = async (req, res) => {

        let post = await getPostData(req)
        if (!!post.task)
        {
            let result = await model.add(post.task);

            if (result)
                res.end(stringify({
                    'status': 1, data: {
                        id: result,
                        task: post.task,
                        completed: false
                    }
                }));
            res.end(stringify({'status': 0}));

        }
    }

    fetch = async (id) => {
        return await model.fetch(id);
    }

    get_all = async (req, res) => {

        let result = await model.get_all()
        if (result)
            res.end(stringify({status: 1, data: result}));
        res.end(stringify({status: 0}));

    }

    delete = async (id, req, res) => {
        let result = await model.delete(id);
        if (result)
            res.end(stringify({status: 1}));
        else
            res.end(stringify({status: 0}));
    }

    update = async (id, req, res) => {

        let post = await getPostData(req)
        if ('completed' in post ) {
            let fields = {
                'completed': +post.completed
            }
            let result = await model.update(id, fields);
            if (result)
                res.end(stringify({status: 1}));
            else
                res.end(stringify({status: 0}));
        } else {
            res.end(stringify({status: 0}));
        }
    }
}

module.exports = TodoController;
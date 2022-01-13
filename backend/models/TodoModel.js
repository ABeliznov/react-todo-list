const {db} = require('../database')

class TodoModel
{
    add(task, callback)
    {
        db.run(`INSERT INTO todo ('task') VALUES(?)`, [task], function(err) {
            if (err)
            {
                console.log(err.message);
                callback(false);
            }
            else
            {
                callback(true);
            }
        });
    }

    fetch(id, callback)
    {
        db.get('SELECT * FROM todo WHERE id = ?', [id], (err, data) => {

            if( err )
                callback(false);
            else
                callback(data);
        });
    }

    get_all(callback)
    {
        db.all('SELECT * FROM todo', (err, data) => {
            if( err )
                callback(false);
            else
                callback(data);
        });
    }

    delete(id, callback)
    {
        db.run(`DELETE FROM todo WHERE id = ?`, [id], function(err) {
            if (err)
            {
                callback(false);
            }
            else
            {
                callback(true);
            }
        });
    }

    update(id, fields, callback)
    {
        let fieldsList = [];
        for( let key in fields )
            fieldsList.push(`${key}=${fields[key]}`)
        fields = fieldsList.join(', ');

        db.run(`UPDATE todo SET ${fields}  WHERE id = ?`, [id], function(err) {
            if (err)
            {
                callback(false);
            }
            else
            {
                callback(true);
            }
        });
    }

}

module.exports = TodoModel

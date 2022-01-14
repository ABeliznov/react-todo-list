const {db} = require('../database')

class TodoModel
{
    add(task)
    {
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO todo ('task') VALUES(?)`, [task], function(err) {
                if (err)
                    return reject(false)
                resolve(this.lastID)
            });
        });
    }

    fetch(id)
    {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM todo WHERE id = ?', [id], (err, data) => {
                if( err )
                    return reject(false);
                resolve(data);
            });
        })
    }

    get_all()
    {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM todo', (err, data) => {
                if( err )
                    return reject(false);
                resolve(data);
            });
        })

    }

    delete(id)
    {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM todo WHERE id = ?`, [id], function(err) {
                if (err)
                    return reject(false)
                resolve(true)
            });
        })
    }

    update(id, fields)
    {
        let fieldsList = [];
        for( let key in fields )
            fieldsList.push(`${key}=${fields[key]}`)
        fields = fieldsList.join(', ');

        return new Promise((resolve, reject) => {
            db.run(`UPDATE todo SET ${fields}  WHERE id = ?`, [id], function(err) {
                if (err)
                    return reject(false)
                resolve(true)
            });
        });
    }

}

module.exports = TodoModel

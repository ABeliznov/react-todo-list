const {db} = require('database')

db.serialize(function() {
    db.run(`
        DROP TABLE 'todo';
        CREATE TABLE 'todo' (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task VARCHAR(255),
            completed INTEGER DEFAULT '0'
        ); 
    `);
});
db.close();
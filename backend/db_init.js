const {db} = require('./database.js')

db.serialize(function() {
    db.run(`
        CREATE TABLE IF NOT EXISTS 'todo' (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task VARCHAR(255),
            completed INTEGER DEFAULT '0'
        ); 
    `);
});
db.close();
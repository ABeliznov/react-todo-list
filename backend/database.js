const sqlite3 = require('sqlite3').verbose();
const path = require('path')

const db = new sqlite3.Database(path.resolve(__dirname, 'db.sqlite3'));

module.exports = {
    db
}
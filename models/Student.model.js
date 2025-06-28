const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./database.db')

//Create a table if not exists
db.run(`
    CREATE TABLE IF NOT EXISTS students(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        father TEXT,
        mother TEXT
    )    
`)

const Student = {
    all(callback){
        db.all('select * from students',callback)
    },
    find(id, callback){
        db.get('select * from students where id = ?',[id],callback)
    },
    count(callback){
        db.all('select count(*) as total from students',callback)
    },
    create(data,callback){
        const {name, father, mother} = data
        db.run('INSERT INTO students(name, father, mother) values(?,?,?)',[name, father, mother],callback)
    },
    update(id, data, callback){
        const {name, father, mother} = data
        db.run('UPDATE students set name=?, father=?, mother=? where id =?',[name, father, mother, id],callback)
    },
    delete(id, callback){
        db.run('DELETE FROM students where id = ?',[id],callback)
    }
}

module.exports = Student
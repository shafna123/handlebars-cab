const db = require('./db');

function getAll(callback){
    const sql = "SELECT id, name, email  FROM passenger";
    db.executeQuery(sql,[],callback);
}


function addOne(name,email,age,callback){
    const sql = "INSERT INTO passenger (name,email) VALUES (?,?)";
    db.executeQuery(sql, [name, email], callback);
}

module.exports.getAll = getAll;
module.exports.addOne = addOne;
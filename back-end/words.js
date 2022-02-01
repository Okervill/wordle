const { v4: uuidv4 } = require('uuid');
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./files/storage.db');
const allWordsJSON = require('./files/allWords.json');

let uuids = new Map();
let uuidsSet = new Set();

for (let word of allWordsJSON) {
    let random = uuidv4();
    random = random.split('-')[4];
    uuids.set(word, random);
    uuidsSet.add(random);
}

if (uuidsSet.size === allWordsJSON.length) {
    let query = 'INSERT INTO words(word, id) VALUES(?,?)';
    uuids.forEach((v, k) => {
        console.log(k, v);
        db.run(query, [k, v], function (err) {
            if (err) {
                console.error(err)
                process.exit(1);
            };
            console.log(this.lastID);
        });
    });
}
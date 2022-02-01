require('dotenv').config();
var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./files/storage.db');

router.get('/', (req, res, next) => {
    res.redirect('http://okker.io/wordle');
});

router.get('/game/random', async (req, res) => {
    let wordInfo = await getRandom()
        .catch(err => {
            console.error(err);
            res.send({ error: 'Something went wrong' });
        });
    return res.redirect(`${wordInfo.uuid}`);
});

router.get('/game/:gameid', async (req, res) => {
    let gameid = req.params.gameid;
    let gameWord = await getWord(gameid)
        .catch(err => {
            console.error(err);
            res.send({ error: 'Something went wrong' });
        });
    if (!gameWord) {
        res.send({ error: 'Unknown game id' });
    }
    return res.send({ word: gameWord.word });
});

module.exports = router;

function getWord(gameid) {
    let query = 'SELECT word FROM words WHERE uuid = ?';
    return new Promise((resolve, reject) => {
        db.get(query, [gameid], (err, row) => {
            if (err) return reject(err);
            if (!row) return resolve(false);
            return resolve(row);
        });
    });
}

function getRandom() {
    //get ranNum between 1 and 12971
    let min = 1;
    let max = 12971;
    let randomRow = Math.floor(Math.random() * (max - min + 1) + min);
    let query = 'SELECT * FROM ( SELECT ROW_NUMBER () OVER (ORDER BY word ) RowNum, word, uuid FROM words ) t WHERE RowNum = ?'
    return new Promise((resolve, reject) => {
        db.get(query, [randomRow], (err, row) => {
            if (err) return reject(err);
            if (!row) return resolve(false);
            return resolve(row);
        })
    })
}
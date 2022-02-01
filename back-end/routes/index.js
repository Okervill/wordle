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
    return res.send({ word: gameWord.word, uuid: gameWord.uuid });
});

router.get('/word/:word', async (req, res) => {
    let word = req.params.word;
    let exists = await wordExists(word)
        .catch(err => {
            return res.send({ exists: true, word: word, error: err });
        });
    if (!exists) {
        return res.send({ exists: false, word: word });
    } else {
        return res.send({ exists: true, word: word });
    }
});

module.exports = router;

function wordExists(word) {
    let query = 'SELECT word FROM words WHERE word = ?';
    return new Promise((resolve, reject) => {
        db.get(query, [word], (err, row) => {
            if (err) return reject(err);
            if (!row) return resolve(false);
            return resolve(true);
        });
    });
}

function getWord(gameid) {
    let query = 'SELECT word, uuid FROM words WHERE uuid = ?';
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
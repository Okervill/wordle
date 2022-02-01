const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
var http = require('http');
const CronJob = require('cron').CronJob;
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./files/storage.db');
const moment = require('moment');

//Set up cron job to get a new daily word each day at midnight
let job = new CronJob('0 0 * * *', () => {
    //get ranNum between 1 and 12971
    let min = 1;
    let max = 12971;
    let randomRow = Math.floor(Math.random() * (max - min + 1) + min);
    let query = 'SELECT * FROM ( SELECT ROW_NUMBER () OVER (ORDER BY word ) RowNum, word, uuid FROM words WHERE dateused IS NULL) t WHERE RowNum = ?';
    db.get(query, [randomRow], (err, row) => {
        if (err) return console.log(err);
        let updateQuery = 'UPDATE words SET dateused = ? WHERE word = ?';
        db.run(updateQuery, [moment().format('YYYYMMDD'), row.word], function (err) {
            if (err) console.log(err);
        });
    });
}, null, false, 'Europe/London');

const indexRouter = require('./routes/index');

const app = express();

app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);

// error handler
app.use(function (err, req, res, next) {
    console.log(err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const server = http.createServer(app);
server.listen(3005)
console.log(`Server now listening on http://localhost:3000`);
//Start cron job
job.start()


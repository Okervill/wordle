const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var http = require('http');
const CronJob = require('cron').CronJob;
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./files/storage.db');
const moment = require('moment');
const port = 3005;

//Set up cron job to get a new daily word each day at midnight
let job = new CronJob('0 0 * * *', () => {
    let query = 'SELECT * FROM words WHERE dateused IS NULL';
    db.all(query, (err, rows) => {
        if (err) return console.error(err);
        let min = 0;
        let max = rows.length;
        let random = Math.floor(Math.random() * (max - min + 1) + min);
        let rowToUpdate = rows[random];

        let updateQuery = 'UPDATE words SET dateused = ? WHERE word = ?';
        db.run(updateQuery, [moment().format('YYYYMMDD'), rowToUpdate.word], function (err) {
            if (err) console.log(err);
        });
    });
}, null, false, 'Europe/London');

const indexRouter = require('./routes/index');

const app = express();

app.set('view engine', 'jade');
app.set('trust proxy', true);

//Set up lgger
app.use(morgan(function (tokens, req, res) {
    return [
        req.ip,
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}));


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
server.listen(port);
console.log(`Server now listening on http://localhost:${port}`);
//Start cron job
job.start()


var express = require('express');
var app = express();
var mysql = require('mysql');
var myConnection = require('express-myconnection');

// config
var config = require('./config');

// mysql
app.use(myConnection(mysql, config.mysql, 'pool'));

// router
var router = express.Router();
app.use(router);

// static files
router.use(express.static(config.basePath + 'build'));

router.use('/api/v1/participant', function(req, res, next) {
    req.getConnection(function(err, connection) {
        connection.query('SELECT id, nick, active FROM participant', function(err, results) {
            if (err) {
                return next(err);
            }
            var out = [];
            results.forEach(function(row, key) {
                out.push({
                    id: row.id,
                    name: row.nick,
                    active: row.active === 1 ? true : false
                });
            });
            return res.json(out);
        });
    });
});

router.use('/api/v1/event', function(req, res, next) {
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM event', function(err, results) {
            if (err) {
                return next(err);
            }
            var out = [];
            results.forEach(function(row, key) {
                out.push({
                    id: row.id,
                    name: row.name,
                    active: row.active === 1 ? true : false,
                    default_speed: row.default_speed
                });
            });
            return res.json(out);
        });
    });
});

router.use('/api/v1/exercice', function(req, res, next) {
    req.getConnection(function(err, connection) {
        connection.query('SELECT id, date, time, nick, laji, raskaus, kommentti, matka, kesto FROM exercice LIMIT 100', function(err, results) {
            if (err) {
                return next(err);
            }
            var out = [];
            results.forEach(function(row, key) {
                out.push({
                    id: row.id,
                    created: row.date,
                    started: row.time,
                    participant_id: row.nick,
                    event_id: row.laji,
                    pace: row.raskaus,
                    comment: row.kommentti,
                    distance: row.matka,
                    duration: row.kesto
                });
            });
            return res.json(out);
        });
    });
});

// route: landing page
router.use(function(req, res, next) {
    res.sendFile(config.basePath + 'app/frontend/index.html');
});

// launch server
exports.server = app.listen(config.port, function() {
    console.log('Listening on port %d', exports.server.address().port);
});

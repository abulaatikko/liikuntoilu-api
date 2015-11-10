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

router.use('/api/v1/participants', function(req, res, next) {
    req.getConnection(function(err, connection) {
        connection.query('SELECT id, name, active FROM participants', function(err, results) {
            if (err) {
                return next(err);
            }
            var out = [];
            results.forEach(function(row, key) {
                out.push({
                    id: row.id,
                    name: row.name,
                    active: row.active === 1 ? true : false
                });
            });
            return res.json(out);
        });
    });
});

router.use('/api/v1/events', function(req, res, next) {
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM events', function(err, results) {
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

router.use('/api/v1/exercices', function(req, res, next) {
    req.getConnection(function(err, connection) {
        connection.query('SELECT id, created, started, participant_id, event_id, pace, comment, distance, duration FROM exercices LIMIT 100000', function(err, results) {
            if (err) {
                return next(err);
            }
            return res.json(results);
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

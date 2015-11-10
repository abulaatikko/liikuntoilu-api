// init app
var express = require('express');
var app = express();

// config
var config = require('./config');

// repository
var repository = require('./repository');

// router
var router = express.Router();
app.use(router);

// static files
router.use(express.static(config.basePath + 'build'));

// route: api: participants
router.use('/api/v1/participants', function(req, res, next) {
    repository.models.participant.findAll().then(function(participants) {
        return res.json(participants);
    });
});

// route: api: events
router.use('/api/v1/events', function(req, res, next) {
    repository.models.event.findAll().then(function(events) {
        return res.json(events);
    });
});

// route: api: exercices
router.use('/api/v1/exercices', function(req, res, next) {
    repository.models.exercice.findAll().then(function(exercices) {
        return res.json(exercices);
    });
});

// route: landing page
router.use(function(req, res, next) {
    res.sendFile(config.basePath + 'app/frontend/index.html');
});

// launch server
repository.orm.sync().then(function () {
    exports.server = app.listen(config.port, function() {
        console.log('Listening on port %d', exports.server.address().port);
    });
});

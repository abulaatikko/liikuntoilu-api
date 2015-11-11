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

// route: api: participants/:id/exercices
router.use('/api/v1/participants/:id/exercices', function(req, res, next) {
    repository.models.participant.findById(req.params.id).then(function(participant) {
        participant.getExercices().then(function(exercices) {
            return res.json(exercices);
        });
    });
});

// route: api: participants/:id/events
router.use('/api/v1/participants/:id/events', function(req, res, next) {
    repository.models.participant.findById(req.params.id).then(function(participant) {
        participant.getEvents().then(function(events) {
            return res.json(events);
        });
    });
});

// route: api: participants/:id
router.use('/api/v1/participants/:id', function(req, res, next) {
    repository.models.participant.findById(req.params.id).then(function(participant) {
        return res.json(participant);
    });
});

// route: api: participants
router.use('/api/v1/participants', function(req, res, next) {
    repository.models.participant.findAll().then(function(participants) {
        return res.json(participants);
    });
});

// route: api: events/:id
router.use('/api/v1/events/:id', function(req, res, next) {
    repository.models.event.findById(req.params.id).then(function(event) {
        return res.json(event);
    });
});

// route: api: events
router.use('/api/v1/events', function(req, res, next) {
    repository.models.event.findAll().then(function(events) {
        return res.json(events);
    });
});

// route: api: exercices/:id
router.use('/api/v1/exercices/:id', function(req, res, next) {
    repository.models.exercice.findById(req.params.id).then(function(exercice) {
        return res.json(exercice);
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

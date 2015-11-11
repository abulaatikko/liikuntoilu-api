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

router.get('/participants/:exercice_id/exercices', function(req, res, next) {
    repository.models.participant.findById(req.params.exercice_id).then(function(participant) {
        participant.getExercices().then(function(exercices) {
            return res.json(exercices);
        });
    });
});

router.get('/participants/:participant_id/events/:event_id/exercices', function(req, res, next) {
    repository.models.exercice.findAll({
        where: {
            participant_id: req.params.participant_id,
            event_id: req.params.event_id,
        }
    }).then(function(exercices) {
        return res.json(exercices);
    });
});

router.get('/participants/:participant_id', function(req, res, next) {
    repository.models.participant.findById(req.params.participant_id).then(function(participant) {
        return res.json(participant);
    });
});

router.get('/participants', function(req, res, next) {
    repository.models.participant.findAll().then(function(participants) {
        return res.json(participants);
    });
});

router.get('/participants/:participant_id/events', function(req, res, next) {
    repository.orm.query('SELECT DISTINCT A.* FROM events A JOIN exercices B ON (B.event_id = A.id) WHERE B.participant_id = :participant_id', {
        replacements: {
            participant_id: req.params.participant_id,
        },
        type: repository.orm.QueryTypes.SELECT
    }).then(function(events) {
        return res.json(events);
    });
});

router.get('//events/:event_id/participants', function(req, res, next) {
    repository.orm.query('SELECT DISTINCT A.id, A.name, A.active FROM participants A JOIN exercices B ON (B.participant_id = A.id) WHERE B.event_id = :event_id', {
        replacements: {
            event_id: req.params.event_id,
        },
        type: repository.orm.QueryTypes.SELECT
    }).then(function(participants) {
        return res.json(participants);
    });
});

router.get('/events/:event_id/exercices', function(req, res, next) {
    repository.models.exercice.findAll({
        where: {
            event_id: req.params.event_id,
        }
    }).then(function(exercices) {
        return res.json(exercices);
    });
});

router.get('/events/:event_id', function(req, res, next) {
    repository.models.event.findById(req.params.event_id).then(function(event) {
        return res.json(event);
    });
});

router.get('/events', function(req, res, next) {
    repository.models.event.findAll().then(function(events) {
        return res.json(events);
    });
});

router.get('/exercices/:exercice_id', function(req, res, next) {
    repository.models.exercice.findById(req.params.exercice_id).then(function(exercice) {
        return res.json(exercice);
    });
});

router.get('/exercices', function(req, res, next) {
    repository.models.exercice.findAll().then(function(exercices) {
        return res.json(exercices);
    });
});

app.use('/api/v1/', router);

// route: landing page
router.get('/', function(req, res, next) {
    res.sendFile(config.basePath + 'app/frontend/index.html');
});

// launch server
repository.orm.sync().then(function () {
    exports.server = app.listen(config.port, function() {
        console.log('Listening on port %d', exports.server.address().port);
    });
});

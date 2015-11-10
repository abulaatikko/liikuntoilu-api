var express = require('express');
var app = express();
var mysql = require('mysql');
var sequelizeCore = require("sequelize");

// config
var config = require('./config');

// mysql
var sequelize = new sequelizeCore(config.mysql.database, config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    dialect: 'mysql',
    //logging: false
});

// models
var models = {};
models.participant = sequelize.define('participants', {
    name: {
        type: sequelizeCore.STRING,
    },
    active: {
        type: sequelizeCore.BOOLEAN,
    },
}, {
    timestamps: false,
});
models.event = sequelize.define('events', {
    name: {
        type: sequelizeCore.STRING,
    },
    active: {
        type: sequelizeCore.BOOLEAN,
    },
    default_speed: {
        type: sequelizeCore.INTEGER,
    },
}, {
    timestamps: false,
});
models.exercice = sequelize.define('exercices', {
    created: {
        type: sequelizeCore.DATE,
    },
    started: {
        type: sequelizeCore.DATE,
    },
    participant_id: {
        type: sequelizeCore.INTEGER,
    },
    event_id: {
        type: sequelizeCore.INTEGER,
    },
    pace: {
        type: sequelizeCore.INTEGER,
    },
    comment: {
        type: sequelizeCore.TEXT,
    },
    distance: {
        type: sequelizeCore.INTEGER,
    },
    duration: {
        type: sequelizeCore.INTEGER,
    },
}, {
    timestamps: false,
});

// router
var router = express.Router();
app.use(router);



// static files
router.use(express.static(config.basePath + 'build'));

router.use('/api/v1/participants', function(req, res, next) {
    models.participant.findAll().then(function(participants) {
        return res.json(participants);
    });
});

router.use('/api/v1/events', function(req, res, next) {
    models.event.findAll().then(function(events) {
        return res.json(events);
    });
});

router.use('/api/v1/exercices', function(req, res, next) {
    models.exercice.findAll().then(function(exercices) {
        return res.json(exercices);
    });
});

// route: landing page
router.use(function(req, res, next) {
    res.sendFile(config.basePath + 'app/frontend/index.html');
});

// launch server
sequelize.sync().then(function () {
    exports.server = app.listen(config.port, function() {
        console.log('Listening on port %d', exports.server.address().port);
    });
});

var config = require('./config');
var sequelize = require("sequelize");

var orm = new sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    dialect: 'mysql',
    logging: config.debug ? console.log : false,
});

// models
var models = {};
models.participant = orm.define('participants', {
    name: {
        type: sequelize.STRING,
    },
    active: {
        type: sequelize.BOOLEAN,
    },
}, {
    timestamps: false,
});

models.event = orm.define('events', {
    name: {
        type: sequelize.STRING,
    },
    active: {
        type: sequelize.BOOLEAN,
    },
    default_speed: {
        type: sequelize.INTEGER,
    },
}, {
    timestamps: false,
});

models.exercice = orm.define('exercices', {
    created: {
        type: sequelize.DATE,
    },
    started: {
        type: sequelize.DATE,
    },
    participant_id: {
        type: sequelize.INTEGER,
    },
    event_id: {
        type: sequelize.INTEGER,
    },
    pace: {
        type: sequelize.INTEGER,
    },
    comment: {
        type: sequelize.TEXT,
    },
    distance: {
        type: sequelize.INTEGER,
    },
    duration: {
        type: sequelize.INTEGER,
    },
}, {
    timestamps: false,
});

module.exports = {
    models: models,
    orm: orm,
    sequelize: sequelize,
};

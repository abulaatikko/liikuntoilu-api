var express = require('express');
var app = express();

// config
var config = require('./config');

// router
var router = express.Router();
app.use(router);

// static files
router.use(express.static(config.basePath + 'build'));

// route: landing page
router.use(function(req, res, next) {
    res.sendFile(config.basePath + 'app/frontend/index.html');
});

// launch server
exports.server = app.listen(config.port, function() {
    console.log('Listening on port %d', exports.server.address().port);
});

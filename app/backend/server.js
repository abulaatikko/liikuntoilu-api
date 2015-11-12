// init app
var express = require('express');
var app = express();

// cache
var cacher = require("cacher")
var cache = new Cacher();
app.use(cache.cache('seconds', 10));

// config
var config = require('./config');

// repository
var repository = require('./repository');

// router
var router = express.Router();
app.use(router);

// static files
router.use(express.static(config.basePath + 'build'));

// api routes
var apiRoutes = require('./api-routes');
app.use('/api/v1/', apiRoutes);

// route: landing page
router.get('/', function(req, res, next) {
    res.sendFile(config.basePath + 'app/frontend/index.html');
});

// route: the rest
app.use(function(req, res, next) {
    res.status(404).send('404 Not Found');
});

// launch server
repository.orm.sync().then(function () {
    exports.server = app.listen(config.port, function() {
        console.log('Listening on port %d', exports.server.address().port);
    });
});

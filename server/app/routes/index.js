'use strict';
var router = require('express').Router();
module.exports = router;

//members router part of existing fsg
router.use('/members', require('./members'));
//points to /api/index.js which will point to all other routers
router.use('/', require('./api'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});

'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/products', require('./api/productsRouter'));
router.use('/users', require('./api/usersRouter'));
router.use('/orders', require('./api/ordersRouter'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});

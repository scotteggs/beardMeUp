'use strict';
var router = require('express').Router();
module.exports = router;
// var _ = require('lodash');


router.use('/products', require('./productsRouter'));
router.use('/users', require('./usersRouter'));
router.use('/orders', require('./ordersRouter'));


router.use(function (req, res) {
    res.status(404).end();
});


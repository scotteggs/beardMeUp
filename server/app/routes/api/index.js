'use strict';
var router = require('express').Router();
module.exports = router;
// var _ = require('lodash');


router.use('/product', require('./productRouter'));
router.use('/user', require('./userRouter'));
router.use('/order', require('./orderRouter'));
router.use('/review', require('./reviewRouter'));
router.use('/address', require('./addressRouter'));


router.use(function (req, res) {
    res.status(404).end();
});


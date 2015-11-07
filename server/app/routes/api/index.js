'use strict';
var router = require('express').Router();
module.exports = router;
// var _ = require('lodash');


router.use('/product', require('./productRouter'));
router.use('/user', require('./userRouter'));
router.use('/order', require('./orderRouter'));
router.use('/review', require('./reviewRouter'));
router.use('/checkout', require('./checkoutRouter'));


// @OB/ND duplicate logic elsewhere (../index.js)
router.use(function (req, res) {
    res.status(404).end();
});


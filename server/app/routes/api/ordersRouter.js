'use strict';
var router = require('express').Router();
var mongoose = require('mongoose')

var Order = mongoose.model('Order')

router.get('/', function (req, res, next) {
	Order.find()
	.then(function(orders) {
		res.json(orders)
	})
	.then(null,next)
})

router.param('orderId', function(req, res, next, id) {
    Order.findById(id)
    .then(function(order) {
      if(!order) throw new Error('not found!')
      req.order = order
      next()
    })
    .then(null, next)
})

router.get('/:orderId', function (req, res, next) {
	res.json(req.order)
})


router.post('/', function (req, res, next) {
	delete req.body._id;
	Order.create(req.body)
	.then(function(newOrder){
		res.status(201).json(newOrder);
	})
	.then(null, next)
})


router.put('/:orderId', function(req, res, next) {
  delete req.body._id;
  req.order.set(req.body)
  req.order.save()
    .then(function(order) {
      res.status(200).json(order)
    })
    .then(null, next)
})



module.exports = router;


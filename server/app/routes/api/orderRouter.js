'use strict';
var router = require('express').Router();
var mongoose = require('mongoose')

var Order = mongoose.model('Order')

router.get('/', function (req, res, next) {
  if(req.user.accessibility === 'siteAdmin'){
  	Order.find()
  	.then(function(orders) {
  		res.json(orders)
  	})
  	.then(null,next)
  } // @OB/ND else ???
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
  // @OB/ND comparison blues, need .equals()
	if(req.order.user.equals(req.user)|| req.user.accessibility === 'siteAdmin'){
    res.json(req.order);
  } // @OB/ND again else ???
})


// @OB/ND set user to be req.user by default
router.post('/', function (req, res, next) {
	delete req.body._id; // @OB/ND why?
	Order.create(req.body)
	.then(function(newOrder){
		res.status(201).json(newOrder);
	})
	.then(null, next)
})


router.put('/:orderId', function(req, res, next) {
  if(req.order.user._id === req.user._id || req.user.accessibility === 'siteAdmin'){
    delete req.body._id;
    req.order.set(req.body)
    req.order.save()
      .then(function(order) {
        res.status(200).json(order)
      })
      .then(null, next)
  } // @OB/ND again else ???
})

router.delete('/:orderId', function(req, res, next){
  // @OB/ND logic repeat x3: refactor
  if(req.order.user._id === req.user._id || req.user.accessibility === 'siteAdmin'){
    req.order.remove()
    .then(function(){
      res.status(204).end()
    })
    .then(null, next)
  } // @OB/ND again else ???
})


module.exports = router;

















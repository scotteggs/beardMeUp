'use strict';
var router = require('express').Router();
var mongoose = require('mongoose')
var Product = mongoose.model('Product')

router.get('/', function (req, res, next) {
	Product.find({active: true})
	.then(function(products) {
 		res.json(products)
	})
	.then(null,next)
})

router.get('/get/all', function (req, res, next) {
  if(req.user && req.user.role === 'siteAdmin') {
    Product.find()
    .then(function(products) {
      res.json(products)
    })
    .then(null,next)
  } else {
    res.status(403).end();
  }
})


router.param('productId', function(req, res, next, id) {
  Product.findById(id).populate('user')
    .then(function(product) {
      if(!product) throw new Error('not found!')
      req.product = product
      next()
    })
    .then(null, next)
})

router.get('/:productId', function (req, res, next) {
	res.json(req.product)
  .then(null, next)
})

router.get('/store/:userId', function (req, res, next) {
  // res.send(req.params.userId);
  Product.find({user: req.params.userId, active: true})
  .then(function(data){
    res.send(data)
  })
  .then(null, next)
})

router.post('/', function (req, res, next) {
	if(req.user && req.user.role === 'siteAdmin') {
    delete req.body._id;
  	Product.create(req.body)
  	.then(function(newProduct){
  		res.status(201).json(newProduct);
  	})
  	.then(null, next)
  } else {
    res.status(403).end();
  }
})


router.put('/:productId', function(req, res, next) {
  if(req.user && req.user.role === 'siteAdmin') {
    delete req.body._id;
    req.product.set(req.body)
    req.product.save()
      .then(function(product) {
        res.status(200).json(product)
      })
      .then(null, next)
  } else {
    res.status(403).end();
  }
})

router.delete('/:productId', function(req, res, next){
  if(req.user && req.user.role === 'siteAdmin') {
    req.product.remove()
    .then(function(){
      res.status(204).end()
    })
    .then(null, next)
  } else {
    res.status(403).end();
  }
})



module.exports = router;


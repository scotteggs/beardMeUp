'use strict';
var router = require('express').Router();
var mongoose = require('mongoose')
// var _ = require('lodash');

router.get('/', function (req, res, next) {
	mongoose.model('Product')
	.find()
	.then(function(products) {
		console.log(products)
		res.json(products)
	})
	.then(null,next)
})

router.param('productId', function(req, res, next, id) {
  mongoose.model('Product')
    .findById(id)
    .then(function(product) {
      if(!product) throw new Error('not found!')
      req.product = product
      next()
    })
    .then(null, next)
})

router.get('/:productId', function (req, res, next) {
	res.json(req.product)
})


//post route not working
// router.post('/', function (req, res, next) {
// 	console.log('within products post route')
// 	mongoose.model('Product')
// 	.create(req.body)
// 	.then(function(newProduct){
// 		res.status(201).json(newProduct);
// 	})
// 	.then(next, null)
// })

module.exports = router;


'use strict';
var router = require('express').Router();
var mongoose = require('mongoose')

var Address = mongoose.model('Address')

// @OB/ND probably this whole endpoint is unnecessary

router.get('/', function (req, res, next) {
	Address.find()
	.then(function(addresses) {
		res.json(addresses)
	})
	.then(null,next)
})

router.param('addressId', function(req, res, next, id) {
    Address.findById(id)
    .then(function(address) {
      if(!address) throw new Error('not found!')
      req.address = address
      next()
    })
    .then(null, next)
})

router.get('/:addressId', function (req, res, next) {
	res.json(req.address)
})


router.post('/', function (req, res, next) {
	delete req.body._id;
	Address.create(req.body)
	.then(function(newAddress){
		res.status(201).json(newAddress);
	})
	.then(null, next)
})


router.put('/:addressId', function(req, res, next) {
  delete req.body._id;
  req.address.set(req.body)
  req.address.save()
    .then(function(address) {
      res.status(200).json(address)
    })
    .then(null, next)
})

router.delete('/:addressId', function(req, res, next){
  req.address.remove()
  .then(function(){
    res.status(204).end()
  })
  .then(null, next)
})



module.exports = router;

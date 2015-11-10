'use strict';
var router = require('express').Router();
var mongoose = require('mongoose')
var Promise = require('bluebird')
var _ = require('lodash');

var User = mongoose.model('User')
var Product = mongoose.model('Product');
var stripe = require('stripe')('sk_test_cF41RQVpkFeQRg2DRxcJD4cY')

router.get('/', function (req, res, next) {
  if(req.user && req.user.role === 'siteAdmin') {
  	User.find()
  	.then(function(users) {
  		res.json(users)
  	})
  	.then(null,next)
  } else {
    res.status(403).end();
  }
})

router.param('userId', function(req, res, next, id) {
    User.findById(id)
    .then(function(user) {
      if(!user) throw new Error('not found!')
      req.foundUser = user
      next()
    })
    .then(null, next)
})

router.post('/:userId/payment', function(req, res, next){
  var token = req.body.token;
  var amount = req.body.amount;
  stripe.customers.create({
    source: token,
    description: "somekh.daniel@gmail.com"
  })
  .then(function(customer){
    return stripe.charges.create({
      amount: amount,
      currency: "usd",
      customer: customer.id
    })
  }, function(err){
    res.sendStatus(400)
  })
  .then(function(charge){
    return req.foundUser.update({stripeCustomer: charge.customer})
  })
  .then(function(){
    res.sendStatus(200)  
  })
  .then(null, next)
})

router.get('/:userId/cart', function (req, res, next) {
  req.foundUser.populate('cart.product').execPopulate()
  .then(function(user) {
    res.send(user.cart)
  })
})

router.get('/:userId', function (req, res, next) {
	if(hasAccess(req.foundUser, req)){
    res.json(req.foundUser)
  } else {
    res.status(403).end();
  }
})

router.post('/:userId/cart', function (req, res, next) {
  if(hasAccess(req.foundUser, req)) {
    req.foundUser.addToCart(req.body)
    .then(function(user) {
      res.json(user);
    })
  } else {
    res.status(403).end();
  }
})

router.post('/', function (req, res, next) {
  if(req.user && req.user.role === 'siteAdmin') {
	  delete req.body._id;
  	User.create(req.body)
  	.then(function(newUser){
  		res.status(201).json(newUser);
  	})
  	.then(null, next)
  } else {
    res.status(403).end();
  }
})


router.put('/:userId', function(req, res, next) {
  if(hasAccess(req.foundUser, req)){
    delete req.body._id;
    req.foundUser.set(req.body)
    req.foundUser.save()
      .then(function(user) {
        res.status(200).json(user)
      })
      .then(null, next)
  } else {
    res.status(403).end();
  }
})

router.delete('/:userId', function(req, res, next){
  if(hasAccess(req.foundUser, req)){
    req.foundUser.remove()
    .then(function(){
      res.status(204).end()
    })
    .then(null, next)
  } else {
    res.status(403).end();
  }
})

function hasAccess(theUser, req){
  return theUser.equals(req.user) || req.user.role === "siteAdmin"
}



module.exports = router;


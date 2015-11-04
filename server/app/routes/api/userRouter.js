'use strict';
var router = require('express').Router();
var mongoose = require('mongoose')

var User = mongoose.model('User')

router.get('/', function (req, res, next) {
  if(req.user && req.user.accessibility === 'siteAdmin') {
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

router.get('/:userId', function (req, res, next) {
	if(req.foundUser._id === req.user._id || req.user.accessibility === 'siteAdmin'){
    res.json(req.foundUser)
  }
})


router.post('/', function (req, res, next) {
  if(req.user && req.user.accessibility === 'siteAdmin') {
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
  if(req.foundUser._id === req.user._id || req.user.accessibility === 'siteAdmin'){
    delete req.body._id;
    req.foundUser.set(req.body)
    req.foundUser.save()
      .then(function(user) {
        res.status(200).json(user)
      })
      .then(null, next)
  }
})

router.delete('/:userId', function(req, res, next){
  if(req.foundUser._id === req.user._id || req.user.accessibility === 'siteAdmin'){
    req.foundUser.remove()
    .then(function(){
      res.status(204).end()
    })
    .then(null, next)
  }
})



module.exports = router;


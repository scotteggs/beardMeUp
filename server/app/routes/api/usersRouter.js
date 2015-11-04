'use strict';
var router = require('express').Router();
var mongoose = require('mongoose')

var User = mongoose.model('User')

router.get('/', function (req, res, next) {
	User.find()
	.then(function(users) {
		res.json(users)
	})
	.then(null,next)
})

router.param('userId', function(req, res, next, id) {
    User.findById(id)
    .then(function(user) {
      if(!user) throw new Error('not found!')
      req.user = user
      next()
    })
    .then(null, next)
})

router.get('/:userId', function (req, res, next) {
	res.json(req.user)
})


router.post('/', function (req, res, next) {
	delete req.body._id;
	User.create(req.body)
	.then(function(newUser){
		res.status(201).json(newUser);
	})
	.then(null, next)
})


router.put('/:userId', function(req, res, next) {
  delete req.body._id;
  req.user.set(req.body)
  req.user.save()
    .then(function(user) {
      res.status(200).json(user)
    })
    .then(null, next)
})



module.exports = router;


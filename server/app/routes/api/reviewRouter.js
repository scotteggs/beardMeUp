'use strict';
var router = require('express').Router();
var mongoose = require('mongoose')

var Review = mongoose.model('Review')

router.get('/', function (req, res, next) {
	Review.find()
	.then(function(reviews) {
		res.json(reviews)
	})
	.then(null,next)
})

router.param('reviewId', function(req, res, next, id) {
    Review.findById(id)
    .then(function(review) {
      if(!review) throw new Error('not found!')
      req.review = review
      next()
    })
    .then(null, next)
})

router.get('/:reviewId', function (req, res, next) {
	res.json(req.review)
})


router.post('/', function (req, res, next) {
	delete req.body._id;
	Review.create(req.body)
	.then(function(newReview){
		res.status(201).json(newReview);
	})
	.then(null, next)
})


router.put('/:reviewId', function(req, res, next) {
  delete req.body._id;
  req.review.set(req.body)
  req.review.save()
    .then(function(review) {
      res.status(200).json(review)
    })
    .then(null, next)
})

router.delete('/:reviewId', function(req, res, next){
  req.review.remove()
  .then(function(){
    res.status(204).end()
  })
  .then(null, next)
})


module.exports = router;

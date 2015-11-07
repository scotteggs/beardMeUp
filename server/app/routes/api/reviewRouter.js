'use strict';
var router = require('express').Router();
var mongoose = require('mongoose')

var Review = mongoose.model('Review')

router.get('/', function (req, res, next) {
	Review.find().populate('reviewer')
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

// @OB/ND auth? also maybe set user to be req.user by default?
router.post('/', function (req, res, next) {
	delete req.body._id;
  req.body.reviewer = req.user;
	Review.create(req.body)
	.then(function(newReview){
		res.status(201).json(newReview);
	})
	.then(null, next)
})


router.put('/:reviewId', function(req, res, next) {
  if (hasAccess(req.review, req)) {
    delete req.body._id;
    req.review.set(req.body)
    req.review.save()
      .then(function(review) {
        res.json(review);
      })
      .then(null, next)
  } else {
    res.status(403).end();
  }
})

router.delete('/:reviewId', function(req, res, next){
  if (hasAccess(req.review, req)){
    req.review.remove()
    .then(function(){
      res.status(204).end()
    })
    .then(null, next)
  } else {
    res.status(403).end();
  }
})

function hasAccess(review, req) {
  return review.reviewer.equals(req.user) || req.user.role === 'siteAdmin'
}


module.exports = router;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var mongoose = require('mongoose');
var Promise = require('bluebird');

// Require in all models.
require('../../../server/db/models');

var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Product = mongoose.model('Product');

describe('Review model', function () {
    var user;
    var product;
    var review;

    beforeEach('Establish DB connection', function (done) {
        if (!mongoose.connection.db) mongoose.connect(dbURI, done);
        var userPromise = User.create({
            email: 'test@email.com'
        });
        var productPromise = Product.create({
            name: 'myProd',
            sku: 'sku124',
            price: 1000,
            type: 'Beard'
        });
        Promise.all([userPromise,productPromise])
        .then(function (arr) {
            user = arr[0];
            product = arr[1];
            review = new Review({
                product: product._id,
                rating: 2,
                content: "i love it",
                reviewer: user._id
            })
            return review.save()
        })
        .then(function(review) {
            done();
        });

    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Review).to.be.a('function');
    });

    it('should have the right properties', function() {
        expect(review.product).to.equal(product._id);
        expect(review.rating).to.equal(2);
        expect(review.content).to.equal('i love it');
        expect(review.reviewer).to.equal(user._id);

    })

    it('should fail if rating is not 1-5', function() {
        review.rating = 6;
        review.save()
        .then(null, function(err) {
            expect(err).to.equal(ValidationError);
        })

    })

});

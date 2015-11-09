// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Product = mongoose.model('Product');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Product Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('Product get request', function () {

		var agent;

		beforeEach('Create guest agent', function () {
			agent = supertest.agent(app)
		});

		it('should get a 200 response', function (done) {
			agent.get('/api/product')
				.expect(200)
				.end(done);
		});

	});

	describe('Create a product', function () {

		var loggedInAgent;
		var product;
		var productToCreate = {
		    name: "fancy testinggg",
		    sku: "testing",
		    desc: "wear thi",
		    price: 10000,
		    type: "Beard",
		    colorOptions: [
		      {name: "blue", stock: 3,HSB: [240,1,1]}
		    ]
		}
		

		afterEach('Clear test database', function (done) {
			clearDB(done);
		});

		beforeEach('Create loggedIn user agent and authenticate', function (done) {
			loggedInAgent = supertest.agent(app);
			done()
		});

		it('should post with 201 response and with an object as the body', function (done) {
			loggedInAgent.post('/api/product/').send(productToCreate).expect(201).end(function (err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('object');
				expect(response.body.name).to.equal('fancy testinggg')
				done();
			});
			done()
		});

		it('should put with a 200 when the product is modified', function (done) {
			Product.create(productToCreate)
			.then( function (product) {
				var productId = product._id;
				product.name = "new name"
				loggedInAgent.put('/api/product/'+productId).send(product).expect(200).end(function (err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('object');
				expect(response.body.name).to.equal('new name')
				done();
			})
			}, done);
			done()
		});

		it('should delete with a 204 when a product is deleted', function (done) {
			Product.create(productToCreate)
			.then( function (product) {
				var productId = product._id;
				loggedInAgent.delete('/api/product/'+productId).expect(204).end(function (err, response) {
					if (err) return done(err);
					done();
				})
			}, done);
			done();
		})
	});




});
// // Instantiate all models
// var mongoose = require('mongoose');
// require('../../../server/db/models');
// var Product = mongoose.model('Product');
// var User = mongoose.model('User')
// var Promise = require('bluebird')


// var expect = require('chai').expect;

// var dbURI = 'mongodb://localhost:27017/testingDB';
// var clearDB = require('mocha-mongoose')(dbURI);

// var supertest = require('supertest');
// var app = require('../../../server/app');

// describe('Order Route', function () {
// 	beforeEach('Establish DB connection', function (done) {
// 		if (mongoose.connection.db) return done();
// 		mongoose.connect(dbURI, done);
// 	});

// 	afterEach('Clear test database', function (done) {
// 		clearDB(done);
// 	});

// 	describe('Order get request', function () {

// 		var agent;

// 		beforeEach('Create guest agent', function () {
// 			agent = supertest.agent(app)
// 		});

// 		it('should get a 200 response', function (done) {
// 			agent.get('/api/order')
// 				.expect(200)
// 				.end(done);
// 		});
// 	});
// 	describe('Create an order', function () {
// 		var loggedInAgent;
// 		var product;		
// 		var orderToCreate;
// 		var productToCreate = {
// 		    name: "fancy testinggg",
// 		    sku: "testing",
// 		    desc: "wear thi",
// 		    price: 10000,
// 		    type: "Beard",
// 		    colorOptions: [
// 		      {name: "blue", stock: 3,HSB: [240,1,1]}
// 		    ]
// 		}
// 		var userToCreate = {
// 			email: 'testemail@test.com',
// 			password: 'password'
// 		}

// 		Promise.all(
// 		Product.create(productToCreate),
// 			User.create(userToCreate) 
// 			).then(function (arr) {
// 				var orderToCreate = {
// 		    	user: arr[1]._id,
// 		    	cart: [{qty: 1, product: arr[0]._id, color: 'Black' }],
// 				}
// 			})

// 		afterEach('Clear test database', function (done) {
// 			clearDB(done);
// 		});

// 		beforeEach('Create loggedIn user agent and authenticate', function (done) {
// 			loggedInAgent = supertest.agent(app);
// 			done()
// 		});

// 		it('should post with 201 response and with an object as the body', function (done) {
// 			loggedInAgent.post('/api/order/').send(orderToCreate).expect(201).end(function (err, response) {
// 				if (err) return done(err);
// 				expect(response.body).to.be.an('object');
// 				done();
// 			});
// 		});
// 	})
 
// })
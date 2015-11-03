// var dbURI = 'mongodb://localhost:27017/testingDB';
// var clearDB = require('mocha-mongoose')(dbURI);

// var expect = require('chai').expect;
// var mongoose = require('mongoose');

// // Require in all models.
// require('../../../server/db/models');

// var Review = mongoose.model('Review');

// describe('User model', function () {

//     beforeEach('Establish DB connection', function (done) {
//         if (mongoose.connection.db) return done();
//         mongoose.connect(dbURI, done);
//     });

//     afterEach('Clear test database', function (done) {
//         clearDB(done);
//     });

//     it('should exist', function () {
//         expect(User).to.be.a('function');
//     });

//     describe('password encryption', function () {

//         describe('generateSalt method', function () {

//             it('should exist', function () {
//                 expect(User.generateSalt).to.be.a('function');
//             });

//             it('should return a random string basically', function () {
//                 expect(User.generateSalt()).to.be.a('string');
//             });

//         });

    
//     });

// });

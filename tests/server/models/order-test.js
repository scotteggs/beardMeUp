// var dbURI = 'mongodb://localhost:27017/testingDB';
// var clearDB = require('mocha-mongoose')(dbURI);

// var expect = require('chai').expect;
// var mongoose = require('mongoose');

// // Require in all models.
// require('../../../server/db/models');

// var Order = mongoose.model('Order');
// var User = mongoose.model('User');

// describe('Order model', function () {

//     beforeEach('Establish DB connection', function (done) {

//         if(!mongoose.connection.db) mongoose.connect(dbURI, done);
//         var user = new User({
//             email: "test email"
//         })

//         var order = new Order({
//             user: 
//             name: 'Tom Hank Beard',
//             sku: 'mysku1',
//             desc: 'my description',
//             price: 1000,
//             type: 'Beard',
//             colorOptions: [{name: 'Blue', HSB:[0,0,0]}],
//             active: true,
//             tags: ['cool', 'sick']
//         });

//         product.save()
//         .then(done)
//     });

//     afterEach('Clear test database', function (done) {
//         clearDB(done);
//     });

//     it('should exist', function () {
//         expect(Product).to.be.a('function');
//     });

//     describe('product creation', function () {

//         describe('single product', function () {

//             it('should exist', function () {
//                 expect(product.name).to.be('Tom Hank Beard');
//                 expect(product.sku).to.be('mysku1');
//                 expect(product.desc).to.be('my description');
//                 expect(product.price).to.be(1000);
//                 expect(product.type).to.be('Beard');
//                 expect(product.colorOptions[0].name).to.be('Blue');
//                 expect(product.colorOptions[0].stock).to.be(0);
//                 expect(product.active).to.be(false);
//                 expect(product.tags).to.be(['cool', 'sick']);
//             });


//         });

    
//     });
// });
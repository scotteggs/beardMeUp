var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chaiAsPromise = require('chai-as-promised');
chai.use(chaiAsPromise);

// Require in all models.
require('../../../server/db/models');

var Order = mongoose.model('Order');
var User = mongoose.model('User');
var Product = mongoose.model('Product');

xdescribe('Order model', function () {

    var product;
    var order;
    var user;

    beforeEach('Establish DB connection', function (done) {

        if(!mongoose.connection.db) mongoose.connect(dbURI);
        var userPromise = User.create({
            email: "mike@fullstack.com"
        })
        var productPromise = Product.create({
            name: 'Tom Hank Beard',
            sku: 'mysku1',
            desc: 'my description',
            price: 1000,
            type: 'Beard',
            colorOptions: [{name: 'Blue', HSB:[0,0,0]}],
            tags: ['cool', 'sick']
        });

        Promise.all([userPromise, productPromise])
        .then(function(all){
            user = all[0]
            product = all[1]
            order = new Order({
                user: user._id,
                cart:[{qty:1,product: product._id,color: 'Blue'}]
            });
            return order.save()
        })
        .then(function(order){
            order = order;
            done();
        })
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Order).to.be.a('function');
    });

    it('should create an order with valid cart and user', function () {
        expect(order.user).to.equal(user._id);
        expect(order.cart[0].product).to.equal(product._id);


    });


});
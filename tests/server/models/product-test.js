var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Product = mongoose.model('Product');

describe('Product model', function () {

    var product;

    beforeEach('Establish DB connection', function (done) {

        if(!mongoose.connection.db) mongoose.connect(dbURI);


        product = new Product({
            name: 'Tom Hank Beard',
            sku: 'mysku1',
            desc: 'my description',
            price: 1000,
            type: 'Beard',
            colorOptions: [{name: 'Blue', HSB:[0,0,0]}],
            tags: ['cool', 'sick']
        });

        product.save()
        .then(function(product) {
            done();
        });
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Product).to.be.a('function');
    });

    it('has the right properties', function () {
        // @OB/ND what is this testing?
        expect(product.name).to.equal('Tom Hank Beard');
        expect(product.sku).to.equal('mysku1');
        expect(product.desc).to.equal('my description');
        expect(product.price).to.equal(1000);
        expect(product.type).to.equal('Beard');
        expect(product.colorOptions[0].name).to.equal('Blue');
        expect(product.colorOptions[0].stock).to.equal(0);
        expect(product.active).to.equal(false);
        expect(product.tags[1]).to.equal('sick');
    });


});

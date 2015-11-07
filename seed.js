/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Product = Promise.promisifyAll(mongoose.model('Product'));
var Order = Promise.promisifyAll(mongoose.model('Order'));
var Review = Promise.promisifyAll(mongoose.model('Review'));

var seedUsers = function (products) {

    var users = [
        {

            firstName: 'Testing',
            lastName: 'Sucks',
            email: 'testing@fsa.com',
            primaryAddress: [{
                line1: '123 fullstack',
                // line2: '',
                city: 'New York',
                state: 'NY',
                zip: '42424',
                phone: '555-555-5555'
            }],
            password: 'password'
        },
        {
            firstName: 'Angular',
            lastName: 'is great',
            email: 'obama@gmail.com',
            primaryAddress: [{
                line1: '123 fullstack',
                // line2: '',
                city: 'New York',
                state: 'NY',
                zip: '42424',
                phone: '555-555-5555'
            }],
            password: 'potus'
        },
        {
            firstName: 'Omri',
            lastName: 'Bernstein',
            email: 'admin@beardmeup.com',
            password: 'password',
            primaryAddress: [{
                line1: '123 fullstack',
                // line2: '',
                city: 'New York',
                state: 'NY',
                zip: '42424',
                phone: '555-555-5555'
            }],
            role: 'siteAdmin',
            cart: [{
                qty: 2,
                product: products[0].id,
                color: 'blue',
                price: products[0].price
            },
            {
                qty: 3,
                product: products[1].id,
                color: 'black',
                price: products[1].price
            }]
        }
    ];

    return User.createAsync(users);

};

var seedOrders = function (users, products) {
    var firstUser = users[0];
    var firstProduct = products[0];

    var secondUser = users[0];
    var secondProduct = products[0];

    var orders = [
        {
            user: firstUser._id,
            cart: [
                {
                    qty: 3,
                    product:firstProduct._id,
                    color: 'green',
                    price: firstProduct.price

                },
                {
                    qty: 3,
                    product:secondProduct._id,
                    color: 'blue',
                    price: secondProduct.price
                },
                {
                    qty: 3,
                    product:secondProduct._id,
                    color: 'green',
                    price: secondProduct.price
                }
            ],
            status: 'fulfilled'
        },
        {
            user: secondUser._id,
            cart: [
                {
                    qty: 3,
                    product:firstProduct._id,
                    color: 'blue',
                    price: firstProduct.price
                },
                {
                    qty: 3,
                    product:secondProduct._id,
                    color: 'green',
                    price: secondProduct.price
                },
                {
                    qty: 2,
                    product:secondProduct._id,
                    color: 'yellow',
                    price: secondProduct.price
                }
            ],
            status: 'unfulfilled'
        },
        {
            user: secondUser._id,
            cart: [
                {
                    qty: 3,
                    product:firstProduct._id,
                    color: 'blue',
                    price: firstProduct.price
                },
                {
                    qty: 3,
                    product:secondProduct._id,
                    color: 'green',
                    price: secondProduct.price
                },
                {
                    qty: 2,
                    product:secondProduct._id,
                    color: 'yellow',
                    price: secondProduct.price
                }
            ],
            status: 'overdue'
        }

    ];

    return Order.createAsync(orders);

};

var seedReviews = function(users, products) {
    var prod0 = products[0]._id;
    var prod1 = products[1]._id;
    var user0 = users[0]._id;
    var user1 = users[1]._id;

    var reviews = [{
        product: prod0,
        rating: 4,
        content: "This beard was pretty damn beardy",
        reviewer: user0
    }, {
        product: prod0,
        rating: 3,
        content: "I'd say this beard was of average beard quality",
        reviewer: user1
    }, {
        product: prod1,
        rating: 2,
        content: "I wasn't a huge beard of this beard",
        reviewer: user0
    }, {
        product: prod1,
        rating: 5,
        content: "OMG this beard was beardtastic",
        reviewer: user1
    }]

    return Review.createAsync(reviews);
}

var seedProducts = function () {

    var products = [
        {
            name: 'fancy beard',
            description: 'wear this beard to a fancy party. lorem ipsum blah blah blah, mike is really cool and this is long enough to be realistic now maybe? or maybe now. ok how about now. this is probably fine.',
            price: 10000,
            stock: 23,
            type: 'Beard',
            colors: ['brown', 'dark brown', 'red', 'green', 'blue', 'gray'],
            tags: ['fancy', 'beard'],
            imageUrl: 'http://www.fillmurray.com/200/200'
        },
        {
            name: 'casual beard',
            description: 'wear this beard to a casual party. lorem ipsum blah blah blah, mike is really cool and this is long enough to be realistic now maybe? or maybe now. ok how about now. this is probably fine.',
            price: 1000,
            type: 'Beard',
            stock: 55,
            colors: ['black', 'blond', 'brown', 'dark brown'],
            tags: ['casual', 'beard'],
            imageUrl: 'http://www.fillmurray.com/201/201'
        },
        {
            name: 'pirate mustache',
            description: 'AAAAAARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR',
            price: 10000,
            stock: 39,
            colors: [ 'black', 'brown', 'dark brown', 'blue', 'gray'],
            type: 'Mustache',
            tags: ['pirate', 'parrot'],
            imageUrl: 'http://www.fillmurray.com/202/202'
        },
        {
            name: 'sexy stubble',
            description: 'yeah you know you like it. is this long enough yet? HOW ABOUT NOW!?!?!?! i like pizza i like pizza i like pizza yeah yeah yeah heh yeh hey hey',
            price: 10000,
            stock: 99,
            colors: [ 'brown', 'dark brown', 'red'],
            type: 'Mustache',
            tags: ['sexy', 'stubble'],
            imageUrl: 'http://www.fillmurray.com/199/199'
        }
    ];

    return Product.createAsync(products);

};

connectToDb.then(function () {
    mongoose.connection.db.dropDatabase(function() {
        var products;
        var users;
        seedProducts()
        .then(function (_products) {
            products = _products;
            return seedUsers(products)
        })
        .then(function(_users) {
            users = _users;
            return seedOrders(users, products)
        }).then(function() {
            return seedReviews(users, products)
        }).then(function(){
            console.log(chalk.green('Seed successful!'));
            process.kill(0);  
        }).catch(function (err) {
            console.error(err);
            process.kill(1);
        });
        
    })



});

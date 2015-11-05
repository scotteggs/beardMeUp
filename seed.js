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

var seedUsers = function () {

    var users = [
        {

            firstName: 'Testing',
            lastName: 'Sucks',
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            firstName: 'Angular',
            lastName: 'is great',
            email: 'obama@gmail.com',
            password: 'potus'
        },
        {
            firstName: 'Omri',
            lastName: 'Bernstein',
            email: 'admin@beardmeup.com',
            password: 'password',
            role: 'siteAdmin'
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
                    price: 1000

                },
                {
                    qty: 3,
                    product:secondProduct._id,
                    color: 'blue',
                    price: 32
                },
                {
                    qty: 3,
                    product:secondProduct._id,
                    color: 'green',
                    price: 1000
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
                    price: 32
                },
                {
                    qty: 3,
                    product:secondProduct._id,
                    color: 'green',
                    price: 1000
                },
                {
                    qty: 2,
                    product:secondProduct._id,
                    color: 'yellow',
                    price: 115
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
                    price: 32
                },
                {
                    qty: 3,
                    product:secondProduct._id,
                    color: 'green',
                    price: 1000
                },
                {
                    qty: 2,
                    product:secondProduct._id,
                    color: 'yellow',
                    price: 115
                }
            ],
            status: 'overdue'
        }

    ];

    return Order.createAsync(orders);

};

var seedProducts = function () {

    var products = [
        {
            name: 'fancy beard',
            sku: 'fbsku',
            desc: 'wear this beard to a fancy party. lorem ipsum blah blah blah, mike is really cool and this is long enough to be realistic now maybe? or maybe now. ok how about now. this is probably fine.',
            price: 10000,
            type: 'Beard',
            colorOptions: [{
                name: 'blue',
                HSB: [240,1,1],
                stock: 3
            }, {
                name: 'red',
                HSB: [0,1,1],
                stock: 4
            }],
            tags: ['fancy', 'beard'],
            imageUrl: 'http://www.fillmurray.com/200/200'
        },
        {
            name: 'casual beard',
            sku: 'cbsku',
            desc: 'wear this beard to a casual party. lorem ipsum blah blah blah, mike is really cool and this is long enough to be realistic now maybe? or maybe now. ok how about now. this is probably fine.',
            price: 1000,
            type: 'Beard',
            colorOptions: [{
                name: 'brown',
                HSB: [100,0.5,1],
                stock: 3
            }, {
                name: 'red',
                HSB: [0,1,1],
                stock: 4
            }],
            tags: ['casual', 'beard'],
            imageUrl: 'http://www.fillmurray.com/201/201'
        },
        {
            name: 'pirate mustache',
            sku: 'pmsku',
            desc: 'AAAAAARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR',
            price: 10000,
            type: 'Mustache',
            colorOptions: [{
                name: 'blue',
                HSB: [240,1,1],
                stock: 3
            }, {
                name: 'black',
                HSB: [0,1,0],
                stock: 100
            }],
            tags: ['pirate', 'parrot'],
            imageUrl: 'http://www.fillmurray.com/202/202'
        },
        {
            name: 'sexy stubble',
            sku: 'sssku',
            desc: 'yeah you know you like it. is this long enough yet? HOW ABOUT NOW!?!?!?! i like pizza i like pizza i like pizza yeah yeah yeah heh yeh hey hey',
            price: 10000,
            type: 'Mustache',
            colorOptions: [{
                name: 'blonde',
                HSB: [240,1,1],
                stock: 0
            }, {
                name: 'black',
                HSB: [0,1,0],
                stock: 100
            }],
            tags: ['sexy', 'stubble'],
            imageUrl: 'http://www.fillmurray.com/199/199'
        }
    ];

    return Product.createAsync(products);

};

connectToDb.then(function () {
    mongoose.connection.db.dropDatabase(function() {
        Promise.all([seedUsers(),seedProducts()])
        .then(function (arr) {
            var users = arr[0];
            var products = arr[1];
            return seedOrders(users, products)
        }).then(function(){
            console.log(chalk.green('Seed successful!'));
            process.kill(0);  
        }).catch(function (err) {
            console.error(err);
            process.kill(1);
        });
        
    })



});

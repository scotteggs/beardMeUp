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

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

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
            tags: ['fancy', 'beard']
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
            tags: ['casual', 'beard']
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
            tags: ['pirate', 'parrot']
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
            tags: ['sexy', 'stubble']
        }
    ];

    return Product.createAsync(products);

};

connectToDb.then(function () {
    mongoose.connection.db.dropDatabase(function() {
        Promise.all(seedUsers(), seedProducts())
        .then(function (arr) {
            console.log(chalk.green('Seed successful!'));
            process.kill(0);
        }).catch(function (err) {
            console.error(err);
            process.kill(1);
        });
        
    })



});

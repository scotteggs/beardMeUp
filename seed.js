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
        },
        {
            firstName: 'Omri',
            lastName: 'Bernstein',
            email: 'somekh.daniel@gmail.com',
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

    var secondUser = users[1];
    var secondProduct = products[1];

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
            name: 'Afghan Chic',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie elit ligula, ut mollis enim varius eu. Pellentesque at elit porttitor, faucibus elit eget, tristique dolor.',
            price: 10000,
            stock: 23,
            type: 'Beard',
            colors: ['black', 'dark brown', 'brown', 'gray', 'blond'],
            tags: ['fancy', 'beard'],
            imageUrl: 'https://s3.amazonaws.com/beardmeup/beards/1-afghan_chic.jpg'
        },
        {
            name: 'Irish Burly',
            description: 'Maecenas nec nisl dolor. Suspendisse fermentum ut massa in elementum. Ut eros magna, lacinia quis velit in, interdum posuere lacus. In consectetur euismod orci, quis rhoncus risus fermentum at.',
            price: 5500,
            type: 'Beard',
            stock: 55,
            colors: ['black', 'blond', 'brown', 'dark brown', 'green', 'red', ],
            tags: ['casual', 'beard'],
            imageUrl: 'https://s3.amazonaws.com/beardmeup/beards/2-irish_burly.jpg'
        },
        {
            name: 'The Gosling',
            description: 'Ryan Thomas Gosling (born November 12, 1980) is a Canadian actor, film director, screenwriter, musician and businessman. He began his career as a child star on the Disney Channel.',
            price: 10299,
            stock: 39,
            colors: ['brown', 'dark brown'],
            type: 'Beard',
            tags: ['gosling', 'sexy', 'celebrity'],
            imageUrl: 'https://s3.amazonaws.com/beardmeup/beards/3-gosling.jpg'
        },
        {
            name: 'Bernstein Special',
            description: 'yeah you know you like it. is this long enough yet? HOW ABOUT NOW!?!?!?! i like pizza i like pizza i like pizza yeah yeah yeah heh yeh hey hey. Seriously, Omri has the best beard known to man.',
            price: 9999,
            stock: 99,
            colors: [ 'black', 'dark brown', 'blond'],
            type: 'Beard',
            tags: ['fullstack', 'omri', 'celebrity'],
            imageUrl: 'https://s3.amazonaws.com/beardmeup/beards/4-berstein_special.jpg'
        },
        {
            name: 'Heavy Stubble',
            description: 'Suspendisse aliquet dictum erat, in imperdiet lorem aliquet id. Nam non condimentum tellus. Nulla elementum consequat nibh, non scelerisque magna gravida auctor.',
            price: 5999,
            stock: 929,
            colors: [ 'black', 'dark brown'],
            type: 'Beard',
            tags: ['sexy', 'stubble'],
            imageUrl: 'https://s3.amazonaws.com/beardmeup/beards/5-heavy_stubble.jpg'
        },
        {
            name: 'Diamond Beard',
            description: 'Maecenas nec luctus sapien. In auctor, ante ut dapibus volutpat, nulla nisl scelerisque mi, sit amet molestie sem nulla at turpis. Pellentesque eget luctus felis, at malesuada mauris.',
            price: 5875,
            stock: 99,
            colors: ['gray'],
            type: 'Beard',
            tags: ['diamond', 'white'],
            imageUrl: 'https://s3.amazonaws.com/beardmeup/beards/6-diamond_beard.jpg'
        },
        {
            name: 'Gyllenhooliheay',
            description: 'Jacob Benjamin "Jake" Gyllenhaal (born December 19, 1980) is an American actor. The son of director Stephen Gyllenhaal and screenwriter Naomi Foner, Gyllenhaal began acting at the age of ten.',
            price: 9229,
            stock: 99,
            colors: [ 'black', 'brown', 'dark brown'],
            type: 'Beard',
            tags: ['jake', 'celebrity'],
            imageUrl: 'https://s3.amazonaws.com/beardmeup/beards/7-gyllenhooliheay.jpg'
        },
        {
            name: 'Huismann',
            description: 'yMichiel Huisman is a Dutch actor, musician, and singer-songwriter, who has acted in both Dutch and English-language TV series and films.',
            price: 8779,
            stock: 99,
            colors: [ 'dark brown', 'black'],
            type: 'Beard',
            tags: ['sexy', 'celebrity', 'michiel'],
            imageUrl: 'https://s3.amazonaws.com/beardmeup/beards/8-huismann.jpg'
        },
        {
            name: 'Abe Royale',
            description: 'Abraham Lincoln was the 16th President of the United States, serving from March 1861 until his assassination in April 1865. Lincoln led the United States through its Civil War—its bloodiest war and its greatest moral, constitutional, and political crisis.',
            price: 100000,
            stock: 23,
            colors: [ 'black'],
            type: 'Beard',
            tags: ['sexy', 'stubble'],
            imageUrl: 'https://s3.amazonaws.com/beardmeup/beards/9-the_lincoln.jpg'
        },
        {
            name: 'Pornstache',
            description: 'Suspendisse nec augue tempus, ornare risus a, suscipit purus. Nullam ut consequat ipsum. Donec fringilla lobortis aliquet. Cras consectetur diam lectus, eget tempor risus suscipit non. In malesuada pellentesque velit at interdum.',
            price: 1099,
            stock: 99,
            colors: [ 'black', 'brown', 'dark brown'],
            type: 'Mustache',
            tags: ['perverted', 'Orange is the New Black'],
            imageUrl: 'https://s3.amazonaws.com/beardmeup/beards/10-pornstache.jpg'
        },
        {
            name: 'Mustache di Seleck',
            description: 'Thomas William "Tom" Selleck (born January 29, 1945) is an American actor and film producer. He is best known for his starring role as the private investigator Thomas Magnum in the television series Magnum, P.I. (1980–1988), based in Hawaii.',
            price: 1099,
            stock: 99,
            colors: [ 'black', 'gray'],
            type: 'Mustache',
            tags: ['sexy', 'celebrity'],
            imageUrl: 'https://s3.amazonaws.com/beardmeup/beards/11-mustache_selleck.jpg'
        },
        {
            name: 'Ultimate Handlebar',
            description: 'Donec lobortis nunc sit amet turpis efficitur rutrum. Nulla facilisi. Fusce ac est eu ante luctus scelerisque. Sed placerat ac massa dignissim dictum. Nam interdum odio non dignissim bibendum. Etiam fermentum pellentesque mi et luctus.',
            price: 6999,
            stock: 99,
            colors: [ 'black', 'brown', 'blue'],
            type: 'Mustache',
            tags: ['handlebar', 'hipster'],
            imageUrl: 'https://s3.amazonaws.com/beardmeup/beards/12-ultimate_handlebar.jpg'
        },
        {
            name: 'El Heneral',
            description: 'Suspendisse nec augue tempus, ornare risus a, suscipit purus. Nullam ut consequat ipsum. Donec fringilla lobortis aliquet. Cras consectetur diam lectus, eget tempor risus suscipit non. In malesuada pellentesque velit at interdum.',
            price: 8979,
            stock: 99,
            colors: [ 'black', 'gray'],
            type: 'Mustache',
            tags: ['military', 'general'],
            imageUrl: 'https://s3.amazonaws.com/beardmeup/beards/13-el_heneral.jpg'
        },
        {
            name: 'The Comb',
            description: 'Suspendisse nec augue tempus, ornare risus a, suscipit purus. Nullam ut consequat ipsum. Donec fringilla lobortis aliquet. Cras consectetur diam lectus, eget tempor risus suscipit non. In malesuada pellentesque velit at interdum.',
            price: 1999,
            stock: 99,
            colors: [ 'black', 'gray', 'dark brown'],
            type: 'Mustache',
            tags: ['vintage', 'cute'],
            imageUrl: 'https://s3.amazonaws.com/beardmeup/beards/14-the_comb.jpg'
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

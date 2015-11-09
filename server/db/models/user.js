'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var validators = require('mongoose-validators');
var addressSchema = require('./address');
var cartSchema = require('./order');

var schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        validate: validators.isEmail()
    },
    password: {
        type: String,
        select: false
    },
    salt: {
        type: String,
        select: false
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String,
        select: false
    },
    facebook: {
        id: String,
        select: false
    },
    google: {
        id: String,
        select: false
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    primaryAddress: [addressSchema],
    addresses: [addressSchema],
    cart: [cartSchema],
    role: { // @OB/ND 'role'?
        type: String,
        enum: ['customer', 'storeAdmin', 'storeMgr', 'siteAdmin'],
        default: 'customer'
    } 
});



// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};


schema.methods.hasRole = function(role){
    return this.role === role;
}

schema.methods.addToCart = function(cartItem) {
    var shouldAdd = true;
    var self = this;
    this.cart.forEach(function(item, index) {
        if(item.product.equals(cartItem.product) && item.color === cartItem.color) {
            self.cart[index].qty++;
            shouldAdd = false;
        }
    })
    if(shouldAdd) { 
        this.cart.push(cartItem);
    }
    return this.save();
}


schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);
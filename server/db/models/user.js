'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var validators = require('mongoose-validators');

var schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        validate: validators.isEmail(),
        select: false
    },
    password: {
        type: String,
        select: false
    },
    salt: {
        type: String,
        select: false,
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
    primaryAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    addresses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Address'
    },
    cart: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number
        }]
    },
    accessibility: {
        type: String,
        enum: ['customer', 'storeAdmin', 'storeMgr', 'siteAdmin'],
        default: 'customer',
        select: false
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


//validate email address
schema.pre('save', function(next){
    next();
})


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
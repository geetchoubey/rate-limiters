const handleAsyncErrors = require('../async-handler');
const leakyBucket = require('./leaky-bucket');
const tokenBucket = require('./token-bucket');
const basic = require('./basic');
module.exports = {
    leakyBucket,
    tokenBucket,
    basic,
    middleware: (fn) => handleAsyncErrors(async (request, response, next) => {
        if (fn()) {
            next();
        } else {
            return response.status(429).json({ message: 'Too many requests. Please try again later.' });
        }
    }),
};
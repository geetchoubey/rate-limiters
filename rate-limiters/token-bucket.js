module.exports = (options) => {
    options = {
        BUCKET_CAPACITY: 10, // Max tokens in the bucket
        TOKEN_RATE: 10, // Tokens to add per second
        ...options
    };
    const store = {};

    return (clientId) => {
        if (!store[clientId]) {
            store[clientId] = {
                tokens: options.BUCKET_CAPACITY,
                lastRefill: Date.now()
            };
        }

        const bucket = store[clientId];
        const now = Date.now();
        const timePassed = (now - bucket.lastRefill) / 1000;

        const tokensToAdd = Math.floor(timePassed * options.TOKEN_RATE);

        bucket.tokens = Math.min(options.BUCKET_CAPACITY, bucket.tokens + tokensToAdd);
        bucket.lastRefill = now;

        if (bucket.tokens >= 1) {
            bucket.tokens -= 1;
            return true;
        } else {
            return false;
        }
    }
}
module.exports = (options) => {
    options = {
        MAX_TOKENS: 5,
        LEAK_RATE: 1,
        ...options
    }
    const store = {};

    return (clientId) => {
        if (!store[clientId]) {
            store[clientId] = { tokens: options.MAX_TOKENS, lastChecked: Date.now() };
        }

        const userBucket = store[clientId];
        const now = Date.now();
        const timePassed = (now - userBucket.lastChecked) / 1000;

        const tokensToAdd = Math.min(options.MAX_TOKENS, Math.floor(userBucket.tokens + timePassed * options.LEAK_RATE));
        userBucket.tokens = tokensToAdd;
        userBucket.lastChecked = now;

        if (userBucket.tokens >= 1) {
            userBucket.tokens -= 1;
            return true;
        } else {
            return false;
        }
    }
};
const handleAsyncErrors = require('../async-handler');

module.exports = (options) => {
    options = {
        LIMIT_WINDOW: 5 * 1000, // 5 seconds
        MAX_REQUESTS: 10,
        ...options
    }

    const store = {};

    return (clientId) => {
        const now = Date.now();

        if (!store[clientId]) {
            store[clientId] = [];
        }

        store[clientId] = store[clientId]
            .filter(timestamp => now - timestamp < options.LIMIT_WINDOW);

        if (store[clientId].length >= options.MAX_REQUESTS) {
            return false;
        }

        store[clientId].push(now);
        return true;
    }
}
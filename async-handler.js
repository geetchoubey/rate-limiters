const handleAsyncErrors = (fn) => async (request, response, next) => {
    try {
        await Promise.resolve(fn(request, response, next)).catch(next)
    } catch(e) {
        next(e);
    }
};

module.exports = handleAsyncErrors;
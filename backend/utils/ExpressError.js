class ExpressError extends Error {
    constructor(message = "Internal Server Error", statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;
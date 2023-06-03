class HTTP500Error extends Error {
    constructor(message = "Internal server error") {
        super();
        this.statusCode = 500;
        this.status = "failed";
        this.message = message;
    }
}

class HTTP400Error extends Error {
    constructor(message = "Bad Request", ...args) {
        super(message, ...args);
        this.statusCode = 400;
        this.status = "failed";
        this.message = message;
    }
}

class HTTP401Error extends Error {
    constructor(message = "Unauthorized") {
        super();
        this.statusCode = 401;
        this.status = "failed";
        this.message = message;
    }
}

class HTTP403Error extends Error {
    constructor(message = "Forbidden") {
        super();
        this.statusCode = 403;
        this.status = "failed";
        this.message = message;
    }
}

module.exports = {
    HTTP500Error,
    HTTP400Error,
    HTTP401Error,
    HTTP403Error,
}
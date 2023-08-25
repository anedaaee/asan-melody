class CustomError extends Error {
    constructor(name , message) {
        super(message);
        this.name = 'CustomError';
        this.isCustom = 1;
    }
}

module.exports = CustomError
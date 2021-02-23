export class ApplicationError extends Error {
    constructor(message: string) {
        super(message);
        if (!message) {
            this.message = 'unknown error';
        }
    }
}

export class FunctionError extends ApplicationError {
    constructor(message: string, functionName: string) {
        super(message);
    }
}

export default class ApplicationError extends Error {
    constructor(message: string) {
        super(message);
        if (!message) {
            this.message = 'unknown message';
        }
    }
}

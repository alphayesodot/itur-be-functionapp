class ApplicationError extends Error {
    public code: number;

    constructor(code: number, message: string) {
        super();
        this.code = code;
        this.message = message || 'Unknown error';
    }
}
export default ApplicationError;

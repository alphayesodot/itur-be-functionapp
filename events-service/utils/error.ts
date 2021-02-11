class ApplicationError extends Error {
    public code: number;

    constructor(message: string) {
        super();
        this.message = message || 'Unknown error';
    }
}
export default ApplicationError;

class FunctionError extends Error {
    public code: Number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
}

export default FunctionError;

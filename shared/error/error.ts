export class ApplicationError extends Error {
    constructor(message: string) {
        super(message);
        if (!message) {
            this.message = 'unknown error';
        }
    }
}

/**
 * FunctionError is an extension of Error for Error in an Azure Function.
 */
export class FunctionError extends Error {
    /**
     * @param message - A message describing the error.
     * @param functionName - The name of the azure function in which the error occurred.
     * @param info - Additional info on the error.
     */
    constructor(message: string, functionName: string, info: string) {
        super(message);
        if (!message) {
            this.message = `Error in ${functionName} function: ${info}`;
        }
    }
}

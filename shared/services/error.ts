export const getResObject = (statusCode: number, body: object | string) => {
    return { status: statusCode ?? process.env.SERVER_ERROR_CODE, body };
};

export class FunctionError extends Error {
    public code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
}

export class ValidationError extends FunctionError {
    constructor() {
        super(parseInt(process.env.VALIDATION_ERROR_CODE, 10), 'Invalid request');
    }
}

export class UnitNotFoundError extends FunctionError {
    constructor() {
        super(parseInt(process.env.SERVER_ERROR_CODE, 10), 'Unit not found');
    }
}

export class DuplicateUnitNameError extends FunctionError {
    constructor() {
        super(parseInt(process.env.VALIDATION_ERROR_CODE, 10), 'Unit name already exist');
    }
}

export class UniqueUnitFieldsValidationError extends FunctionError {
    constructor() {
        super(parseInt(process.env.VALIDATION_ERROR_CODE, 10), 'Owners, interviewrs, and node must be unique');
    }
}

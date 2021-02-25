export class FunctionError extends Error {
    public code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
}

export class ValidationError extends FunctionError {
    constructor(message: string) {
        super(400, message);
    }
}

export class UnitNotFoundError extends FunctionError {
    constructor() {
        super(404, 'Unit not found');
    }
}

export class DuplicateUnitNameError extends FunctionError {
    constructor() {
        super(400, 'Unit name already exist');
    }
}

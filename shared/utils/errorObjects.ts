export const groupNotFoundObj = {
    status: process.env.NOT_FOUND_CODE,
    body: 'Error: No nodes groups',
};

export const connectionFailedObj = {
    status: process.env.SERVER_ERROR_CODE,
    body: 'Error: Connection Failed',
};

export const unitNotFoundObj = {
    status: process.env.SERVER_ERROR_CODE,
    body: 'Error: Unit not found',
};

export const unitDifferentFromNodesGroupObj = {
    status: process.env.VALIDATION_ERROR_CODE,
    body: 'Error: Unit and nodes group have different properties',
};

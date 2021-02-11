const getResObject = (statusCode: number, body: object | string) => {
    return { status: statusCode ?? process.env.SERVER_ERROR_CODE, body };
};

export default getResObject;

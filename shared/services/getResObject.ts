const getResObject = (statusCode: number, body: object | string) => {
    return { status: statusCode ?? 500, body };
};

export default getResObject;

const findObjBySimilarKeyValue = (arr: any[], key: string, value: string) => {
    return arr.find((obj: any) => obj[key].toLowerCase().includes(value.toLowerCase()));
};

export default findObjBySimilarKeyValue;

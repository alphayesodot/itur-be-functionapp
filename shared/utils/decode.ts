const htmlEntities = [
    ['amp', '&'],
    ['apos', "'"],
    ['#x27', "'"],
    ['#x2F', '/'],
    ['#39', "'"],
    ['#47', '/'],
    ['lt', '<'],
    ['gt', '>'],
    ['nbsp', ' '],
    ['quot', '"'],
];

const htmlDecode = (str: string) => {
    let decodedStr = str;
    htmlEntities.forEach((_v, i) => {
        const decodeRegex = new RegExp(`&${htmlEntities[i][0]};`, 'g');
        decodedStr = decodedStr.replace(decodeRegex, htmlEntities[i][1]);
    });
    return decodedStr;
};

export default htmlDecode;

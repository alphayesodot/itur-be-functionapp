const HTMLentities = [
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

export const HTMLdecode = (str :string) => {
    HTMLentities.forEach((_v, i) => {
        str = str.replace(new RegExp('&' + HTMLentities[i][0] + ';', 'g'), HTMLentities[i][1]);
    });

    return str;
};

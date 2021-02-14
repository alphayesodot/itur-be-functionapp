export enum Permissionroles {
    Interviewer = 0,
    check = 2,
}

export enum Gender {
    Female = 0,
    Male = 1,
}

export enum Profile {
    Profile97 = 97,
    Profile82 = 82,
    Profile77 = 77,
    Profile72 = 72,
    Profile64 = 64,
    Profile45 = 45,
    Profile35 = 35,
    Profile25 = 25,
    Profile21 = 21,
}

export enum Dapar {
    Dapar90 = 90,
    Dapar80 = 80,
    Dapar70 = 70,
    Dapar60 = 60,
    Dapar50 = 50,
    Dapar40 = 40,
    Dapar30 = 30,
    Dapar20 = 20,
    Dapar10 = 10,
}

export enum Kaba {
    Kaba56 = 56,
    Kaba55 = 55,
    Kaba54 = 54,
    Kaba53 = 53,
    Kaba52 = 52,
    Kaba51 = 51,
    Kaba50 = 50,
    Kaba49 = 49,
    Kaba48 = 48,
    Kaba47 = 47,
    Kaba46 = 46,
    Kaba45 = 45,
    Kaba44 = 44,
    Kaba43 = 43,
    Kaba42 = 42,
    Kaba41 = 41,
}
export interface Address {
    street: string;
    houseNumber: number;
    cityId: string;
    cityName: string;
}

export interface Language {
    languageId: string;
    language: string;
    languageLevel: number;
    languageLevelDesc: number;
}

export interface Grade {
    examId: string;
    examName: string;
    grade: number;
}

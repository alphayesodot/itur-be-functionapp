import { Gender, Address, Language, Grade, Dapar, Kaba, Profile } from './types';

interface MalshabInterface {
    taz: string;
    personalNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: Gender;
    birthDate: Date;
    profile: Profile;
    kaba: Kaba;
    dapar: Dapar;
    daparRatzif: number;
    zadak: number;
    kahas: number;
    major: string;
    svivot: {};
    madaim: {};
    statusId: number;
    adress: [Address];
    homePhoneNumber: string;
    personalPhoneNumber: string;
    countryBirth: string;
    imigrationDate: Date;
    isIsraeliCitizenship?: boolean;
    isAnotherCitizenship?: boolean;
    statusName: number;
    isOnlyChild: boolean;
    isBereaved: boolean;
    schoolId: string;
    schoolName: string;
    majorName: string;
    languages: [Language];
    EnglishGrade: number;
    tzalagAgrade: number;
    tzalagBgrade: number;
    isPassedKogTirgum?: boolean;
    isPersonalSurvey?: boolean;
    isReligiosSchool?: boolean;
    shakimSchoolAvarage: number;
    isAravist?: boolean;
    pdfQuestionnaire: string; // url to blob storage container
    recordings: [string];
    grades: [Grade]; // is it array?
}

export default MalshabInterface;

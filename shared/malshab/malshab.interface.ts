export interface Malshab {
    identityNumber: string;
    personalNumber?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    gender?: Gender;
    birthDate?: Date;
    medicalProfile?: MedicalProfile;
    kaba?: number;
    dapar?: number;
    ContinuousDapar?: number;
    zadak?: number;
    kahas?: number;
    major?: number;
    aptitudeTest?: AptitudeTest;
    statusId?: number;
    statusName?: string;
    address?: Address;
    homePhoneNumber?: string;
    personalPhoneNumber?: string;
    birthCountry?: string;
    imigrationDate?: Date;
    isIsraeliCitizenship?: boolean;
    isAnotherCitizenship?: boolean;
    isOnlyChild?: boolean;
    isBereaved?: boolean;
    schoolId?: number;
    schoolName?: string;
    majorName?: string;
    languages?: Language[];
    englishGrade?: number;
    tzalagAgrade?: number;
    tzalagBgrade?: number;
    isPassedKogTirgum?: boolean;
    isPersonalSurvey?: boolean;
    isReligiousSchool?: boolean;
    shakimSchoolAverage?: number;
    isArabist?: boolean;
    pdfQuestionnaire?: string;
    interviews?: Array<any>;
    grades?: Grade[];
}

interface AptitudeTest {
    svivatHadraha: number;
    svivatSade: number;
    svivatTipulBeadam: number;
    svivatTechniAhzaka: number;
    svivatTechniHafala: number;
    svivatMinhalVerigun: number;
    svivatIbudMeida: number;
    madadKeshevMitmasheh: number;
    madadKeshevSelektivi: number;
    madadPikud: number;
    madadAvodatTsevet: number;
    madadHashkaVehatmada: number;
    madadBashlutVebagrut: number;
    madadHitnahagutMisgartit: number;
}

interface Address {
    street: string;
    houseNumber: number;
    cityId: number;
    cityName: string;
}

interface Language {
    languageId: number;
    languageName: string;
    languageLevel: number;
    languageLevelDesc: number;
}

interface Grade {
    examId: number;
    examName: string;
    grade: number;
}

export type Gender = 1 | 2;
type MedicalProfile = 21 | 24 | 25 | 45 | 64 | 72 | 82 | 97;

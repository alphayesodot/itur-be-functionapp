import { Schema, Document, model } from 'mongoose';
import Malshab from './malshab.interface';
import config from '../../config';

const { collectionNames } = config.mongo;

const malshabSchema = new Schema({
    identityNumber: String,
    personalNumber: String,
    firstName: String,
    lastName: String,
    email: String,
    gender: Number,
    birthDate: Date,
    medicalProfile: Number,
    kaba: Number,
    dapar: Number,
    continuousDapar: Number,
    zadak: Number,
    kahas: Number,
    major: Number,
    aptitudeTest: {
        svivatHadraha: Number,
        svivatSade: Number,
        svivatTipulBeadam: Number,
        svivatTechniAhzaka: Number,
        svivatTechniHafala: Number,
        svivatMinhalVerigun: Number,
        svivatIbudMeida: Number,
        madadKeshevMitmasheh: Number,
        madadKeshevSelektivi: Number,
        madadPikud: Number,
        madadAvodatTsevet: Number,
        madadHashkaVehatmada: Number,
        madadBashlutVebagrut: Number,
        madadHitnahagutMisgartit: Number,
    },
    statusId: Number,
    statusName: String,
    addresses: [
        {
            street: String,
            houseNumber: Number,
            cityId: Number,
            cityName: String,
        },
    ],
    homePhoneNumber: String,
    personalPhoneNumber: String,
    birthCountry: String,
    imigrationDate: Date,
    isIsraeliCitizenship: Boolean,
    isAnotherCitizenship: Boolean,
    isOnlyChild: Boolean,
    isBereaved: Boolean,
    schoolId: Number,
    schoolName: String,
    majorName: String,
    languages: [
        {
            languageId: Number,
            languageName: String,
            languageLevel: Number,
            languageLevelDesc: String,
        },
    ],
    englishGrade: Number,
    tzalagAgrade: Number,
    tzalagBgrade: Number,
    isPassedKogTirgum: Boolean,
    isPersonalSurvey: Boolean,
    isReligiousSchool: Boolean,
    shakimSchoolAverage: Number,
    isArabist: Boolean,
    pdfQuestionnaire: String,
    interviews: Array,
    grades: [
        {
            examId: Number,
            examName: String,
            grade: Number,
        },
    ],
});

export default model<Malshab & Document>(collectionNames.malshab, malshabSchema);

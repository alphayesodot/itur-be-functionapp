import * as mongoose from 'mongoose';
import MalshabInterface from './malshab.interface';
import { Gender, Dapar, Kaba, Profile } from './types';

const Address = new mongoose.Schema({
    street: String,
    houseNumber: Number,
    cityId: String,
    cityName: String,
});

const Language = new mongoose.Schema({
    languageId: String,
    language: String,
    languageLevel: Number,
    languageLevelDesc: Number,
});

const Grade = new mongoose.Schema({
    examId: String,
    examName: String,
    grade: Number,
});

const malshbSchema = new mongoose.Schema({
    taz: { type: String, required: true },
    personalNumber: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: String,
    gender: {
        type: String,
        required: true,
        enum: Object.values(Gender),
    },
    birthDate: { type: Date, required: true },
    profile: {
        type: Number,
        default: Profile.Profile82,
        enum: Object.values(Profile),
    },
    kaba: {
        type: Number,
        default: Kaba.Kaba41,
        enum: Object.values(Kaba),
    },
    dapar: {
        type: Number,
        default: Dapar.Dapar10,
        enum: Object.values(Dapar),
    },
    daparRatzif: Number,
    zadak: Number,
    kahas: Number,
    major: String,
    svivot: {},
    madaim: {},
    statusId: Number,
    adress: [Address],
    homePhoneNumber: String,
    personalPhoneNumber: String,
    countryBirth: String,
    imigrationDate: Date,
    isIsraeliCitizenship: Boolean,
    isAnotherCitizenship: Boolean,
    statusName: Number,
    isOnlyChild: Boolean,
    isBereaved: Boolean,
    schoolId: String,
    schoolName: String,
    majorName: String,
    languages: [Language],
    EnglishGrade: Number,
    tzalagAgrade: Number,
    tzalagBgrade: Number,
    isPassedKogTirgum: Boolean,
    isPersonalSurvey: Boolean,
    isReligiosSchool: Boolean,
    shakimSchoolAvarage: Number,
    isAravist: Boolean,
    pdfQuestionnaire: String, // url to blob storage container
    recordings: [String],
    grades: [Grade], // is it array?
});

const MalshabModel = mongoose.model<MalshabInterface & mongoose.Document>('Malshabs', malshbSchema);
export default MalshabModel;

import Malshab, { Address } from '../../shared/interfaces/malshab.interface';
import Event from '../../shared/interfaces/event.interface';
import RamotUser from './ramotUser.interface';

import { parseIntIfExists } from '../../shared/utils';
import { parsePhoneNumber } from '../utils/index';

export const ramotXmlKeySet = ['itu:ITURTORAMOTDATA', 'PSIFAS_EVENTS', 'PSIFASRECORD'];

export const parseRamotToMalshab = (ramotUser: RamotUser): Malshab => {
    return {
        identityNumber: ramotUser.ID_NUMBER.toString(),
        personalNumber: ramotUser.PERSONAL_NUMBER.toString(),
        firstName: ramotUser.FIRST_NAME,
        lastName: ramotUser.LAST_NAME,
        email: ramotUser.EMAIL,
        gender: ramotUser.GENDER,
        birthDate: new Date(ramotUser.BIRTH_DATE),
        medicalProfile: ramotUser.PROFILE,
        kaba: ramotUser.KABA,
        dapar: ramotUser.DAPAR,
        continuousDapar: ramotUser.DAPAR_RATZIF,
        zadak: ramotUser.ZADAK,
        kahas: parseIntIfExists(ramotUser.KAHAS),
        major: ramotUser.MAJOR,
        aptitudeTest:
            ramotUser.GENDER === 2
                ? {
                      svivatHadraha: parseIntIfExists(ramotUser.SVIVAT_HADRAHA),
                      svivatSade: parseIntIfExists(ramotUser.SVIVAT_SADE),
                      svivatTipulBeadam: parseIntIfExists(ramotUser.SVIVAT_TIPUL_BEADAM),
                      svivatTechniAhzaka: parseIntIfExists(ramotUser.SVIVAT_TECHNI_AHZAKA),
                      svivatTechniHafala: parseIntIfExists(ramotUser.SVIVAT_TECHNI_HAFALA),
                      svivatMinhalVerigun: parseIntIfExists(ramotUser.SVIVAT_MINHAL_VEIRGUM),
                      svivatIbudMeida: parseIntIfExists(ramotUser.SVIVAT_IBUD_MEIDA),
                      madadKeshevMitmasheh: parseIntIfExists(ramotUser.MADAD_KESHEV_MITMASHEH),
                      madadKeshevSelektivi: parseIntIfExists(ramotUser.MADAD_KESHEV_SELEKTIVI),
                      madadPikud: parseIntIfExists(ramotUser.MADAD_PIKUD),
                      madadAvodatTsevet: parseIntIfExists(ramotUser.MADAD_AVODAT_TSEVET),
                      madadHashkaVehatmada: parseIntIfExists(ramotUser.MADAD_HASHKA_VEHATMADA),
                      madadBashlutVebagrut: parseIntIfExists(ramotUser.MADAD_BASHLUT_VEBAGRUT),
                      madadHitnahagutMisgartit: parseIntIfExists(ramotUser.MADAD_HITNAHAGUT_MISGARTIT),
                  }
                : undefined,
        statusId: parseIntIfExists(ramotUser.STATUS_ID),
        statusName: ramotUser.STATUS_NAME,
        address: [
            {
                street: ramotUser.STREET1,
                houseNumber: parseIntIfExists(ramotUser.HOUSE_NUMBER1),
                cityId: ramotUser.CITY_ID1,
                cityName: ramotUser.CITY_NAME1,
            },
            {
                street: ramotUser.STREET2,
                houseNumber: parseIntIfExists(ramotUser.HOUSE_NUMBER2),
                cityId: ramotUser.CITY_ID2,
                cityName: ramotUser.CITY_NAME2,
            },
        ].filter((address: Address) => address.cityName),
        homePhoneNumber: parsePhoneNumber(ramotUser.PHONE_NUMBER1),
        personalPhoneNumber: parsePhoneNumber(ramotUser.PHONE_NUMBER2.toString()),
        birthCountry: ramotUser.COUNTRY_BIRTH,
        imigrationDate: ramotUser.IMIGRATION_DATE ? new Date(ramotUser.IMIGRATION_DATE) : undefined,
        isIsraeliCitizenship: !!ramotUser.IS_ISRAELI_CITIZENSHIP,
        isAnotherCitizenship: !!ramotUser.IS_ANOTHER_CITIZENSHIP,
        isOnlyChild: !!ramotUser.IS_ONLY_CHILD,
        isBereaved: !!ramotUser.IS_BEREAVED,
        schoolId: parseIntIfExists(ramotUser.SCHOOL_ID),
        schoolName: ramotUser.SCHOOL_NAME,
        majorName: ramotUser.MAJOR_NAME,
        languages: [
            {
                languageId: parseIntIfExists(ramotUser.LANGUAGE1_ID),
                languageName: ramotUser.LANGUAGE1,
                languageLevel: ramotUser.LANGUAGE_LEVEL1,
                languageLevelDesc: ramotUser.LANG_LEVEL_DESC1,
            },
            {
                languageId: parseIntIfExists(ramotUser.LANGUAGE2_ID),
                languageName: ramotUser.LANGUAGE2,
                languageLevel: ramotUser.LANGUAGE_LEVEL2,
                languageLevelDesc: ramotUser.LANG_LEVEL_DESC2,
            },
            {
                languageId: parseIntIfExists(ramotUser.LANGUAGE3_ID),
                languageName: ramotUser.LANGUAGE3,
                languageLevel: ramotUser.LANGUAGE_LEVEL3,
                languageLevelDesc: ramotUser.LANG_LEVEL_DESC3,
            },
            {
                languageId: parseIntIfExists(ramotUser.LANGUAGE4_ID),
                languageName: ramotUser.LANGUAGE4,
                languageLevel: parseIntIfExists(ramotUser.LANGUAGE_LEVEL4),
                languageLevelDesc: ramotUser.LANG_LEVEL_DESC4,
            },
            {
                languageId: parseIntIfExists(ramotUser.LANGUAGE5_ID),
                languageName: ramotUser.LANGUAGE5,
                languageLevel: parseIntIfExists(ramotUser.LANGUAGE_LEVEL5),
                languageLevelDesc: ramotUser.LANG_LEVEL_DESC5,
            },
        ],
        englishGrade: parseIntIfExists(ramotUser.ENGLISH_GRADE),
        tzalagAgrade: parseIntIfExists(ramotUser.TZALAG_A_GRADE),
        tzalagBgrade: parseIntIfExists(ramotUser.TZALAG_B_GRADE),
        isPassedKogTirgum: !!ramotUser.IS_PASSED_KOG_TIRGUM,
        isPersonalSurvey: !!ramotUser.IS_PERSONAL_SURVEY,
        isReligiousSchool: !!ramotUser.IS_RELIGIOS_SCHOOL,
        shakimSchoolAverage: ramotUser.SHAKIM_SCHOOL_AVARAGE,
        isArabist: !!ramotUser.IS_ARABIST,
    };
};

export const parseRamotToEvent = (ramotUser: RamotUser): Event => {
    return {
        nodeId: ramotUser.NODE_NAME_ID.toString(),
        malshabId: ramotUser.ID_NUMBER.toString(),
        location: ramotUser.PLACE_NAME.toString(),
        time: new Date(ramotUser.EVENT_DATE),
    };
};

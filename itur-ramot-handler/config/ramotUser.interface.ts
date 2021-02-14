import { Gender, MedicalProfile } from '../../shared/interfaces/malshab.interface';

export default interface RamotUser {
    ID_NUMBER: number;
    PERSONAL_NUMBER: number;
    FIRST_NAME: string;
    LAST_NAME: string;
    GENDER: Gender;
    BIRTH_DATE: string;
    PROFILE: MedicalProfile;
    KABA: number;
    DAPAR: number;
    DAPAR_RATZIF: number;
    ZADAK: number;
    KAHAS: string;
    MAJOR: number;
    SVIVAT_HADRAHA: string;
    SVIVAT_SADE: string;
    SVIVAT_TIPUL_BEADAM: string;
    SVIVAT_TECHNI_AHZAKA: string;
    SVIVAT_TECHNI_HAFALA: string;
    SVIVAT_MINHAL_VEIRGUM: string;
    SVIVAT_IBUD_MEIDA: string;
    MADAD_KESHEV_MITMASHEH: string;
    MADAD_KESHEV_SELEKTIVI: string;
    MADAD_PIKUD: string;
    MADAD_AVODAT_TSEVET: string;
    MADAD_HASHKA_VEHATMADA: string;
    MADAD_BASHLUT_VEBAGRUT: string;
    MADAD_HITNAHAGUT_MISGARTIT: string;
    STATUS_ID: string;
    STREET1: string;
    HOUSE_NUMBER1: number;
    CITY_ID1: number;
    CITY_NAME1: string;
    STREET2: string;
    HOUSE_NUMBER2: string;
    CITY_ID2: number;
    CITY_NAME2: string;
    PHONE_NUMBER1: number;
    PHONE_NUMBER2: number;
    COUNTRY_BIRTH: string;
    IMIGRATION_DATE: string;
    IS_ISRAELI_CITIZENSHIP: number;
    IS_ANOTHER_CITIZENSHIP: number;
    STATUS_NAME: string;
    IS_ONLY_CHILD: number;
    IS_BEREAVED: number;
    SCHOOL_ID: string;
    SCHOOL_NAME: string;
    MAJOR_NAME: string;
    LANGUAGE1_ID: string;
    LANGUAGE1: string;
    LANGUAGE_LEVEL1: number;
    LANG_LEVEL_DESC1: string;
    LANGUAGE2_ID: string;
    LANGUAGE2: string;
    LANGUAGE_LEVEL2: number;
    LANG_LEVEL_DESC2: string;
    LANGUAGE3_ID: string;
    LANGUAGE3: string;
    LANGUAGE_LEVEL3: number;
    LANG_LEVEL_DESC3: string;
    LANGUAGE4_ID: string;
    LANGUAGE4: string;
    LANGUAGE_LEVEL4: string;
    LANG_LEVEL_DESC4: string;
    LANGUAGE5_ID: string;
    LANGUAGE5: string;
    LANGUAGE_LEVEL5: string;
    LANG_LEVEL_DESC5: string;
    EVENT_DATE: string;
    PATH_NAME_ID: number;
    PATH_NAME: string;
    NODE_NAME_ID: number;
    NODE_NAME: string;
    PLACE_NAME: string;
    ENGLISH_GRADE: string;
    TZALAG_A_GRADE: string;
    TZALAG_B_GRADE: string;
    IS_PASSED_KOG_TIRGUM: number;
    IS_PERSONAL_SURVEY: number;
    IS_RELIGIOS_SCHOOL: number;
    SHAKIM_SCHOOL_AVARAGE: number;
    IS_ARABIST: number;
    NODE_IN_PATH_ID: string;
    CANDIDATE_NODE_POSITION_ID: number;
    EMAIL: string;
}

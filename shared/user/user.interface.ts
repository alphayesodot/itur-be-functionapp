export enum Role {
    Interviewer = 'INTERVIEWER',
    RamadIturOfUnit = 'RAMAD_ITUR_OF_UNIT',
    RamadIturAssistant = 'RAMAD_ITUR_ASSISTANT',
    ProfessionalRamad = 'PROFESSIONAL_RAMAD',
    Mada = 'MADA',
    Itur = 'ITUR',
    Psychologist = 'PSYCHOLOGIST',
    Diagnoser = 'DIAGNOSER',
    Technical = 'TECHNICAL',
}

export interface User {
    id: string;
    name: string;
    role: Role;
    unit: string;
}

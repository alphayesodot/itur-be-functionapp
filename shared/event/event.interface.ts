export enum EventStatus {
    Created = 'CREATED',
    UnitAssociated = 'UNIT_ASSOCIATED',
    InterviewerAssigned = 'INTERVIEWER_ASSIGNED',
    DidNotHappen = 'DID_NOT_HAPPEN',
    Completed = 'COMPLETED',
}

export interface EventResult {
    notes: string;
    filesUrls: string[];
}

export interface Event {
    nodeId: string;
    nodesGroupId: string;
    malshabShort: {
        id: string;
        firstName: string;
        lastName: string;
    };
    time: Date;
    location: string;
    interviewersIds: string[];
    status: EventStatus;
    url?: string;
    results?: EventResult[];
}

export interface Event {
    nodeId: string;
    malshabId: string;
    time: Date;
    location: string;
    interviewersIds: string[];
    status: string; // Should later be an enum
    url?: string;
}

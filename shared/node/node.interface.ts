export enum NodeType {
    Interview = 'INTERVIEW',
    Exam = 'EXAM',
    Physical = 'PHYSICAL',
    Unknown = 'UNKNOWN',
}

export interface Node {
    id: string;
    alias?: string;
    type: NodeType;
    unit: string;
    nodesGroupId: string;
}

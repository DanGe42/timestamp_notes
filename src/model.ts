export enum NoteType {
    NORMAL = "",
    PRO = "+",
    CON = "-",
    MEH = "~",
    OVERALL = "=",
}

export interface Note {
    timestamp: Date;
    type: NoteType;
    text: string;
}

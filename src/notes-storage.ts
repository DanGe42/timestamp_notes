import { Note, NoteType } from "./model";

interface JSONNote {
    timestamp: string;
    type: string;
    text: string;
}

/**
 * NotesStorage is a layer over native browser local storage APIs. NotesStorage
 * persists the current interview timeline. This ensures that an accidental
 * page unload/reload of any sort won't cause us to lose our current interview
 * notes.
 */
export default class NotesStorage {
    storage: Storage;

    constructor(storage = localStorage) {
        this.storage = storage;
    }

    get currentNotes(): Note[] {
        const currentNotes = this.storage.getItem("currentNotes");
        if (!currentNotes) {
            return [];
        }

        const rawNotes: JSONNote[] = JSON.parse(currentNotes);
        // JSON.stringify will serialize Date objects as strings, and JSON.parse
        // generally won't have enough information to deserialize our JSON back
        // into objects of their original types. Thus, we need to make some
        // adjustments.
        return rawNotes.map((rawNote) =>
            Object.assign(rawNote, {
                timestamp: new Date(rawNote.timestamp),
                type: this.stringToNoteType(rawNote.type),
            }));
    }

    set currentNotes(notes: Note[]) {
        this.storage.setItem("currentNotes", JSON.stringify(notes || []));
    }

    private stringToNoteType(type: string): NoteType {
        switch (type) {
            case "=": return NoteType.OVERALL;
            case "+": return NoteType.PRO;
            case "-": return NoteType.CON;
            case "~": return NoteType.MEH;
            case "": return NoteType.NORMAL;
            default:
                /* tslint:disable:no-console */
                console.warn(`Found inappropriate NoteType "${type}". Returning NORMAL.`);
                return NoteType.NORMAL;
        }
    }
}

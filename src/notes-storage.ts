import { Note, NoteType } from './model';

interface JSONNote {
    timestamp: string;
    type: string;
    text: string;
}

export default class NotesStorage {
    storage: Storage;

    constructor(storage = localStorage) {
        this.storage = storage;
    }

    get currentNotes(): Note[] {
        const currentNotes = this.storage.getItem('currentNotes');
        if (!currentNotes) {
            return [];
        }

        const rawNotes: JSONNote[] = JSON.parse(currentNotes);
        return rawNotes.map(rawNote =>
            Object.assign(rawNote, {
                timestamp: new Date(rawNote.timestamp),
                type: this.stringToNoteType(rawNote.type)
            }));
    }

    set currentNotes(notes: Note[]) {
        this.storage.setItem('currentNotes', JSON.stringify(notes || []));
    }

    private stringToNoteType(type: string): NoteType {
        switch (type) {
            case '=': return NoteType.OVERALL;
            case '+': return NoteType.PRO;
            case '-': return NoteType.CON;
            case '~': return NoteType.MEH;
            case '': return NoteType.NORMAL;
            default:
                console.warn(`Found inappropriate NoteType "${type}". Returning NORMAL.`);
                return NoteType.NORMAL;
        }
    }
}

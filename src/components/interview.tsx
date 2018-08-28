import * as React from 'react';

enum NoteType {
    NORMAL = '',
    PRO = '+',
    CON = '-',
    MEH = '~',
    OVERALL = '=',
}

interface Note {
    timestamp: Date;
    type: NoteType;
    text: string;
}

interface EntryProps {
    note: Note;
}

const Entry = (props: EntryProps) => {
    const { timestamp, type, text } = props.note;
    let renderedText = <React.Fragment>{text}</React.Fragment>;
    if (type !== NoteType.NORMAL) {
        renderedText = <em>[{type}] {renderedText}</em>;
    }

    return (<React.Fragment>
        <strong>{timestamp.toLocaleTimeString()}</strong> - {renderedText}
    </React.Fragment>);
};

interface SummaryEntryProps {
    type: NoteType;
    text: string;
}

const SummaryEntry = (props: SummaryEntryProps) => (
    <React.Fragment>({props.type}) {props.text}</React.Fragment>
)

interface InterviewNotesProps {
    notes: Note[];
}

class InterviewNotes extends React.Component<InterviewNotesProps, {}> {
    renderFilteredNotes(noteType: NoteType): React.ReactElement<any>[] {
        const notes = this.props.notes;
        return notes.filter(note => note.type === noteType)
            .map(note => (
                <li key={note.timestamp.getTime()}>
                    <SummaryEntry type={note.type} text={note.text} />
                </li>
            ));
    }

    render() {
        const notes = this.props.notes || [];
        return (
            <div className="well top-padded">
                <ul className="unf-list" id="overview">
                    {this.renderFilteredNotes(NoteType.OVERALL)}
                </ul>
                <ul className="unf-list" id="pros">
                    {this.renderFilteredNotes(NoteType.PRO)}
                </ul>
                <ul className="unf-list" id="mehs">
                    {this.renderFilteredNotes(NoteType.MEH)}
                </ul>
                <ul className="unf-list" id="cons">
                    {this.renderFilteredNotes(NoteType.CON)}
                </ul>

                <ul className="unf-list" id="notes">
                    {notes.map(note => (
                        <li key={note.timestamp.getTime()}>
                            <Entry note={note} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};

interface NoteTakerProps {
    onSubmit: (note: Note) => any;
}

interface NoteTakerState {
    textValue: string;
}

class NoteTaker extends React.Component<NoteTakerProps, NoteTakerState> {
    constructor(props: NoteTakerProps) {
        super(props);
        this.state = {
            textValue: ''
        };
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const timestamp = new Date();
        const [type, text] = this.inferType(this.state.textValue);
        const note: Note = { timestamp, type, text };

        this.props.onSubmit(note);
        // Clear the input after submission
        this.setState({ textValue: '' });
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ textValue: event.target.value });
    }

    render() {
        return (
            <form id="notes-form" onSubmit={e => this.handleSubmit(e)}>
                <div className="form-group">
                    <input id='note-text'
                        className="form-control" type="text"
                        placeholder="Start with '+', '-', '~' for pros/cons/mehs, or '=' for overall summary."
                        onChange={e => this.handleChange(e)}
                        value={this.state.textValue}
                    />
                </div>
            </form>
        );
    }

    private inferType(note: string): [NoteType, string] {
        switch (note[0]) {
            case '+': return [NoteType.PRO, note.substr(1)];
            case '-': return [NoteType.CON, note.substr(1)];
            case '~': return [NoteType.MEH, note.substr(1)];
            case '=': return [NoteType.OVERALL, note.substr(1)];
            default: return [NoteType.NORMAL, note];
        }
    }
}

interface InterviewState {
    notes: Note[]
}

export default class Interview extends React.Component<any, InterviewState> {
    constructor(props: any) {
        super(props);
        this.state = {
            notes: []
        };
    }

    handleNoteSubmit(note: Note) {
        const notes = this.state.notes.slice();
        notes.push(note);
        this.setState({ notes });
    }

    render() {
        const notes = this.state.notes;
        return (<React.Fragment>
            <div className="row">
                <NoteTaker onSubmit={note => this.handleNoteSubmit(note)} />
            </div>
            <div className="row">
                <InterviewNotes notes={this.state.notes}/>
            </div>
        </React.Fragment>);
    }
}

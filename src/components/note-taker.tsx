import * as React from 'react';

import { Note, NoteType } from '../model';

interface NoteTakerProps {
    onSubmit: (note: Note) => any;
}

interface NoteTakerState {
    textValue: string;
}

export default class NoteTaker extends React.Component<NoteTakerProps, NoteTakerState> {
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

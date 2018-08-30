import * as React from "react";

import { Note, NoteType } from "../model";

interface NoteTakerProps {
    onSubmit: (note: Note) => any;
}

interface NoteTakerState {
    textValue: string;
}

/**
 * NoteTaker handles input submission. It does two things pretty well: emitting
 * Entry objects and clearing itself.
 */
export default class NoteTaker extends React.Component<NoteTakerProps, NoteTakerState> {
    constructor(props: NoteTakerProps) {
        super(props);
        this.state = {
            textValue: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const timestamp = new Date();
        const [type, text] = this.inferType(this.state.textValue);
        const note: Note = { timestamp, type, text };

        this.props.onSubmit(note);
        // Clear the input after submission
        this.setState({ textValue: "" });
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ textValue: event.target.value });
    }

    render() {
        return (
            <form id="notes-form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input name="note-text"
                        className="form-control" type="text"
                        placeholder="Start with '+', '-', '~' for pros/cons/mehs, or '=' for overall summary."
                        onChange={this.handleChange}
                        value={this.state.textValue}
                    />
                </div>
            </form>
        );
    }

    private inferType(note: string): [NoteType, string] {
        switch (note[0]) {
            case "+": return [NoteType.PRO, note.substr(1)];
            case "-": return [NoteType.CON, note.substr(1)];
            case "~": return [NoteType.MEH, note.substr(1)];
            case "=": return [NoteType.OVERALL, note.substr(1)];
            default: return [NoteType.NORMAL, note];
        }
    }
}

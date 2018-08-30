import * as React from "react";

import { Note } from "../model";
import NotesStorage from "../notes-storage";
import NoteTaker from "./note-taker";
import InterviewTimeline from "./timeline";

interface InterviewProps {
    notesStorage: NotesStorage;
}

interface InterviewState {
    notes: Note[];
}

export default class Interview extends React.Component<InterviewProps, InterviewState> {
    constructor(props: InterviewProps) {
        super(props);
        this.state = {
            // Restore timeline from NotesStorage
            notes: props.notesStorage.currentNotes,
        };

        this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
    }

    handleNoteSubmit(note: Note) {
        const notes = [...this.state.notes, note];

        this.setState({ notes });
        // Store the timeline for safe-keeping
        this.props.notesStorage.currentNotes = notes;
    }

    handleClearButtonClick() {
        const response = confirm("Are you sure you want to clear your notes?");
        if (response) {
            this.setState({ notes: [] });
        }
    }

    render() {
        return (<React.Fragment>
            <div className="row">
                <NoteTaker onSubmit={(note) => this.handleNoteSubmit(note)} />
            </div>
            <div className="row">
                <InterviewTimeline notes={this.state.notes}/>
            </div>

            <div className="row">
                <div className="pull-right">
                    <button className="btn btn-danger"
                        onClick={this.handleClearButtonClick}
                    >Clear Notes</button>
                </div>
            </div>
        </React.Fragment>);
    }
}

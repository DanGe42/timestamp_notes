import * as React from 'react';

import { Note } from '../model';
import NoteTaker from './note-taker';
import InterviewTimeline from './timeline';
import NotesStorage from '../notes-storage';

interface InterviewProps {
    notesStorage: NotesStorage;
}

interface InterviewState {
    notes: Note[]
}

export default class Interview extends React.Component<InterviewProps, InterviewState> {
    constructor(props: InterviewProps) {
        super(props);
        this.state = {
            notes: props.notesStorage.currentNotes
        };

        this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
    }

    handleNoteSubmit(note: Note) {
        const notes = this.state.notes.slice();
        notes.push(note);

        this.setState({ notes });
        this.props.notesStorage.currentNotes = notes;
    }

    handleClearButtonClick() {
        let response = confirm("Are you sure you want to clear your notes?");
        if (response) {
            this.setState({ notes: [] });
        }
    }

    render() {
        return (<React.Fragment>
            <div className="row">
                <NoteTaker onSubmit={note => this.handleNoteSubmit(note)} />
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
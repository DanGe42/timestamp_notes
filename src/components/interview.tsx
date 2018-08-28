import * as React from 'react';

import { Note } from '../model';
import NoteTaker from './note-taker';
import InterviewTimeline from './timeline';

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
                <InterviewTimeline notes={this.state.notes}/>
            </div>
        </React.Fragment>);
    }
}

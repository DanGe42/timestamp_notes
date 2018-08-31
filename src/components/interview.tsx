import * as React from "react";

import { Note } from "../model";
import NotesStorage from "../notes-storage";
import ExportableTimeline from "./exportable-timeline";
import NoteTaker from "./note-taker";
import InterviewTimeline from "./timeline";

interface InterviewProps {
    notesStorage: NotesStorage;
}

interface InterviewState {
    notes: Note[];
    exportMode: boolean;
}

export default class Interview extends React.Component<InterviewProps, InterviewState> {
    constructor(props: InterviewProps) {
        super(props);
        this.state = {
            // Restore timeline from NotesStorage
            exportMode: false,
            notes: props.notesStorage.currentNotes,
        };

        this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
        this.handleNoteSubmit = this.handleNoteSubmit.bind(this);
        this.handleExportChange = this.handleExportChange.bind(this);
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

    handleExportChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ exportMode: event.target.checked });
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <NoteTaker onSubmit={this.handleNoteSubmit} />
                </div>
                <div className="row">
                    <div className="form-check">
                        <label className="form-check-label">
                            <input name="export"
                                className="form-check-input"
                                type="checkbox"
                                checked={this.state.exportMode}
                                onChange={this.handleExportChange} />
                                Export
                        </label>
                    </div>
                    {this.renderTimeline()}
                </div>

                <div className="row">
                    <div className="pull-right">
                        <button className="btn btn-danger"
                            onClick={this.handleClearButtonClick}
                        >Clear Notes</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private renderTimeline() {
        if (this.state.exportMode) {
            return <ExportableTimeline notes={this.state.notes} />;
        } else {
            return <InterviewTimeline notes={this.state.notes} />;
        }
    }
}

import * as React from 'react';

import { Entry, SummaryEntry } from './entry';
import { Note, NoteType } from '../../model';

interface InterviewNotesProps {
    notes: Note[];
}

export default class InterviewTimeline extends React.Component<InterviewNotesProps, {}> {
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
                <ul className="unf-list">
                    {this.renderFilteredNotes(NoteType.OVERALL)}
                </ul>
                <ul className="unf-list">
                    {this.renderFilteredNotes(NoteType.PRO)}
                </ul>
                <ul className="unf-list">
                    {this.renderFilteredNotes(NoteType.MEH)}
                </ul>
                <ul className="unf-list">
                    {this.renderFilteredNotes(NoteType.CON)}
                </ul>

                <ul className="unf-list">
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

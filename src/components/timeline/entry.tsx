import * as React from 'react';

import { Note, NoteType } from '../../model';

interface EntryProps {
    note: Note;
}

export const Entry = (props: EntryProps) => {
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

export const SummaryEntry = (props: SummaryEntryProps) => (
    <React.Fragment>({props.type}) {props.text}</React.Fragment>
)

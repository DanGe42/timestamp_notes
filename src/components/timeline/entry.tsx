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

    return (<li>
        <strong>{timestamp.toLocaleTimeString()}</strong> - {renderedText}
    </li>);
};

interface SummaryEntryProps {
    type: NoteType;
    text: string;
}

export const SummaryEntry = (props: SummaryEntryProps) => (
    <li>({props.type}) {props.text}</li>
)

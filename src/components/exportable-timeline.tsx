import * as React from "react";
import Textarea from "react-textarea-autosize";

import { Note, NoteType } from "../model";

interface ExportableTimelineProps {
    notes: Note[];
}

function formatMinutes(minutes: number): string {
    return minutes < 10 ? `0${minutes}` : `${minutes}`;
}

export default class ExportableTimeline extends React.Component<ExportableTimelineProps, {}> {
    constructor(props: ExportableTimelineProps) {
        super(props);
        this.handleTextAreaClick = this.handleTextAreaClick.bind(this);
    }

    formattedNotes(): string {
        const lines = this.props.notes.map((note) => {
            const { timestamp, type, text } = note;

            const minutes = formatMinutes(timestamp.getMinutes());
            const message = (type === NoteType.NORMAL) ?
                text : `[${type}] ${text}`;

            return `:${minutes} - ${message}`;
        });
        return lines.join("\n");
    }

    handleTextAreaClick(e: React.MouseEvent<HTMLTextAreaElement>) {
        (e.target as any).select();
    }

    render() {
        return (
            <Textarea className="form-control"
                value={this.formattedNotes()}
                onClick={this.handleTextAreaClick}
                readOnly={true} />
        );
    }
}

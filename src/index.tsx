import '../css/notes.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Interview from './components/interview';
import NotesStorage from './notes-storage';

const notesStorage = new NotesStorage(localStorage);

ReactDOM.render(
    <Interview notesStorage={notesStorage} />,
    document.getElementById('root')
);

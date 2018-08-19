import * as $ from 'jquery';

const FIELDS = ['pros', 'cons', 'mehs', 'overview', 'notes']

interface SpecialCharactersMap {
    '+': string;
    '-': string;
    '~': string;
    '=': string;
    [key: string]: string;
}

const SPECIAL_CHARACTERS : SpecialCharactersMap = {
    '+': 'pros',
    '-': 'cons',
    '~': 'mehs',
    '=': 'overview',
}

const PREFIXES : SpecialCharactersMap = {
    '+': '(+) ',
    '-': '(-) ',
    '~': '(~) ',
    '=': '',
};

$(function() {
    $('#notes-form').on('submit', function() {
        let noteText: string = $('#note-text').val() as string;
        if (!noteText) {
            return false;
        }
        takeNote(noteText);
        $('#note-text').val('');
        return false;
    });

    $('#saveBtn').on('click', function() {
        saveNotes();
    });

    $('#clearBtn').on('click', function() {
        clearNotes();
    });

    FIELDS.forEach(function(field) {
        const value = localStorage.getItem(field);
        if (value) {
            $(`#${field}`).html(value);
        }
    });

    const savedNotes = localStorage.getItem('savedNotes');
    if (!savedNotes) {
        $('#savedNotes').html(savedNotes);
    }

});

function takeNote(text: string) {
    if(text[0] in SPECIAL_CHARACTERS) {
        record(SPECIAL_CHARACTERS[text[0]], text.substr(1), PREFIXES[text[0]]);
    } else {
        record('notes', text, "<b>" + getTimeStamp() + "</b> - ");
    }
}

function record(field: string, text: string, prefix: string) {
    let note = "<li>" + prefix + text + "</li>";
    const elem = $(`#${field}`)
    elem.append(note);
    localStorage.setItem(field, elem.html());
}

function getTimeStamp() {
    return new Date().toLocaleTimeString();
}

function clearNotes() {
    let response = confirm("Are you sure you want to clear your notes?");
    if (response) {
        clearFields();
    }
}

function clearFields() {
    FIELDS.forEach(function(field) {
        localStorage.setItem(field, '');
        $(`#${field}`).html('');
    });
}

function saveNotes() {
  let name = prompt("Save as...");
  if (name != '') {
    let fields = "";
    FIELDS.forEach(function(field) {
        fields += $(`#${field}`).html();
    });
    const note = "<strong>" + name + "</strong>" + fields + "</br>";
    localStorage.setItem('savedNotes', localStorage.getItem('savedNotes') + note);
    $('#savedNotes').append(note);

    clearFields();
  }
}

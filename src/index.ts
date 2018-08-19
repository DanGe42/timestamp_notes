import * as $ from 'jquery';

const FIELDS = ['pros', 'cons', 'mehs', 'overview', 'notes']

const SPECIAL_CHARACTERS = {
    '+': 'pros',
    '-': 'cons',
    '~': 'mehs',
    '=': 'overview',
}

const PREFIXES = {
    '+': '(+) ',
    '-': '(-) ',
    '~': '(~) ',
    '=': '',
};

$(function() {
    $('#notes-form').on('submit', function() {
        let noteText = $('#note-text').val();
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

    if (!localStorage.savedNotes) {
        $('#savedNotes').html(localStorage.savedNotes);
    }

});

function takeNote(text) {
    if(text[0] in SPECIAL_CHARACTERS) {
        record(SPECIAL_CHARACTERS[text[0]], text.substr(1), PREFIXES[text[0]]);
    } else {
        record('notes', text, "<b>" + getTimeStamp() + "</b> - ");
    }
}

function record(field, text, prefix) {
    let note = "<li>" + prefix + text + "</li>";
    const elem = $(`#${field}`)
    elem.append(note);
    localStorage[field] = elem.html();
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
        localStorage[field] = '';
        $(`#${field}`).html('');
    });
}

function saveNotes() {
  let name = prompt("Save as...");
  if (name != '') {
    fields = "";
    FIELDS.forEach(function(field) {
        fields += $(`#${field}`).html();
    });
    note = "<strong>" + name + "</strong>" + fields + "</br>";
    localStorage.savedNotes += note;
    $('#savedNotes').append(note);

    clearFields();
  }
}

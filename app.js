const chalk = require('chalk'); //allows highlighting of console text
const yargs = require('yargs'); //a console input parser
const notes = require('./notes.js');

//create the 'add' command for adding a note
yargs.command ({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
})

//create the 'remove' command for removing a note
yargs.command ({
    command: 'remove',
    describe: 'remove an existing note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});

//create the 'list' command for listing all existing notes
yargs.command ({
    command: 'list',
    describe: 'list all existing notes',
    handler() {
        notes.listNotes();
    }
});

//create the 'read' command for reading a single note
yargs.command ({
    command: 'read',
    describe: 'Read an existing note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})

yargs.parse();
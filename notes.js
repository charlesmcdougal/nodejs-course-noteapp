const fs = require('fs'); //file system handler
const chalk = require('chalk'); //allows highlighting of console text

const addNote = (title, body) => {
    const notes = loadNotes();
    // filter loops through an array and passes the current element to a function.
    // It will keep that element if the function returns true
    const duplicateNote = notes.find(note => note.title === title);

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        console.log('New note added.')
    }
    else {
        console.log('Note title is already in use.')
    }
    saveNotes(notes);
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);
    if(notesToKeep.length < notes.length) {
        console.log(`Note '${title}' has been removed`);
        saveNotes(notesToKeep);
    }
    else {
        console.log(`No note with the title '${title}' was found`);
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.bold(`Your Notes`));
    notes.forEach((note) => {
        console.log(`  Title: ${note.title}`);
//        console.log(chalk.gray(`    Body: ${note.body}`));   //we really only want to list the titles with this function
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const noteToPrint = notes.find(note => note.title === title);
    if(!noteToPrint) {
        console.log(chalk.red(`No note with the title '${title}' found`))
    }
    else {
        console.log(`Title: ${noteToPrint.title}`);
        console.log(`Body: ${noteToPrint.body}`);
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (isError) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
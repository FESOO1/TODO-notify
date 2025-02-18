const inputItself = document.querySelector('#inputItself');
const inputDate = document.querySelector('#inputDate');
const inputTime = document.querySelector('#inputTime');
const inputButton = document.querySelector('#inputButton');

// CREATE A NEW NOTE

function createANewNote(e) {
    e.preventDefault();
};

// INITIALIZING BUTTONS
inputButton.addEventListener('click', createANewNote);
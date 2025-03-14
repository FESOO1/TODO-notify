// INPUT
const inputsContainer = document.querySelector('.input');
const inputItself = document.querySelector('#inputItself');
const inputDate = document.querySelector('#inputDate');
const inputTime = document.querySelector('#inputTime');
const inputButton = document.querySelector('#inputButton');
const inputs = document.querySelectorAll('body input');

// OUTPUT
const output = document.querySelector('.output');

// TODO DATA
const todoObject = {
    todo: {
        todoContent: [],
        todoDate: [],
        todoTime: [],
        todoStatus: [],
    },
};

// CREATE A NEW NOTE

function createANewNote(e) {
    e.preventDefault();

    const errorMessages = [];

    for (const input of inputs) {
        if (input.value.length === 0) {
            inputsContainer.classList.add('input-error');
            errorMessages.push(input);
        } else {
            inputsContainer.classList.remove('input-error');
        };
    };

    if (errorMessages.length === 0) {
        output.innerHTML += `
            <div class="output-itself" data-todo-status="in progress">
                <p class="output-itself-text">${inputItself.value}</p>
                <div class="output-itself-date">
                    <h4 class="output-itself-date-text">DATE: <span class="output-itself-date-text-inner">${inputDate.value}</span></h4>
                    <hr class="output-itself-date-divider">
                    <h4 class="output-itself-date-text">TIME: <span class="output-itself-date-text-inner">${inputTime.value}</span></h4>
                </div>
                <div class="output-itself-buttons">
                    <button class="output-itself-button output-itself-button-delete" type="button">DELETE</button>
                    <button class="output-itself-button output-itself-button-finished" type="button">FINISHED</button>
                </div>
            </div>
        `;

        // SAVING THE INPUT VALUES
        todoObject.todo.todoContent.push(inputItself.value);
        todoObject.todo.todoDate.push(inputDate.value);
        todoObject.todo.todoTime.push(inputTime.value);
        todoObject.todo.todoStatus.push('in progress');

        // SAVING THE OBJECT IN THE LOCAL STORAGE
        localStorage.setItem('todoObjectLS', JSON.stringify(todoObject));

        // RESETTING THE INPUTS
        for (const input of inputs) {
            input.value = '';
        };
    };

    // DELETING A TODO LIST
    const outputItself = document.querySelectorAll('.output-itself');
    const deleteButton = document.querySelectorAll('.output-itself-button-delete');
    const finishedButton = document.querySelectorAll('.output-itself-button-finished');

    for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', () => {
            outputItself[i].parentNode.removeChild(outputItself[i]);
            // DELETING A TODO
            todoObject.todo.todoContent.splice(i, 1);
            todoObject.todo.todoDate.splice(i, 1);
            todoObject.todo.todoTime.splice(i, 1);
            todoObject.todo.todoStatus.splice(i, 1);

            // SAVING THE OBJECT IN THE LOCAL STORAGE
            localStorage.setItem('todoObjectLS', JSON.stringify(todoObject));
        });

        // MARK A TODO AS FINISHED
        finishedButton[i].addEventListener('click', () => {
            if (outputItself[i].getAttribute('data-todo-status') === 'in progress') {
                outputItself[i].classList.add('output-itself-finished');
                outputItself[i].setAttribute('data-todo-status', 'finished');
                finishedButton[i].textContent = 'IN PROGRESS';

                todoObject.todo.todoStatus[i] = 'finished';
                // SAVING THE OBJECT IN THE LOCAL STORAGE
                localStorage.setItem('todoObjectLS', JSON.stringify(todoObject));
            } else {
                outputItself[i].classList.remove('output-itself-finished');
                outputItself[i].setAttribute('data-todo-status', 'in progress');
                finishedButton[i].textContent = 'FINISHED';

                todoObject.todo.todoStatus[i] = 'in progress';
                // SAVING THE OBJECT IN THE LOCAL STORAGE
                localStorage.setItem('todoObjectLS', JSON.stringify(todoObject));
            };
        });
    };
};

// INITIALIZING BUTTONS
inputButton.addEventListener('click', createANewNote);

// LOCAL STORAGE

function displayStoredTodos() {
    const todoObjectLS = JSON.parse(localStorage.getItem('todoObjectLS'));

    if (todoObjectLS) {
        for (let i = 0; i < todoObjectLS.todo.todoContent.length; i++) {
            output.innerHTML += `
                <div class="output-itself ${todoObjectLS.todo.todoStatus[i] === 'finished' ? 'output-itself-finished' : ''}" data-todo-status="${todoObjectLS.todo.todoStatus[i]}">
                    <p class="output-itself-text">${todoObjectLS.todo.todoContent[i]}</p>
                    <div class="output-itself-date">
                        <h4 class="output-itself-date-text">DATE: <span class="output-itself-date-text-inner">${todoObjectLS.todo.todoDate[i]}</span></h4>
                        <hr class="output-itself-date-divider">
                        <h4 class="output-itself-date-text">TIME: <span class="output-itself-date-text-inner">${todoObjectLS.todo.todoTime[i]}</span></h4>
                    </div>
                    <div class="output-itself-buttons">
                        <button class="output-itself-button output-itself-button-delete" type="button">DELETE</button>
                        <button class="output-itself-button output-itself-button-finished" type="button">${todoObjectLS.todo.todoStatus[i] === 'finished' ? 'IN PROGRESS' : 'FINISHED'}</button>
                    </div>
                </div>
            `;

            // UPDATING THE OBJECT
            todoObject.todo.todoContent.push(todoObjectLS.todo.todoContent[i]);
            todoObject.todo.todoDate.push(todoObjectLS.todo.todoDate[i]);
            todoObject.todo.todoTime.push(todoObjectLS.todo.todoTime[i]);
            todoObject.todo.todoStatus.push(todoObjectLS.todo.todoStatus[i]);
        };

        // DELETING A TODO LIST
        const outputItself = document.querySelectorAll('.output-itself');
        const deleteButton = document.querySelectorAll('.output-itself-button-delete');
        const finishedButton = document.querySelectorAll('.output-itself-button-finished');

        for (let i = 0; i < deleteButton.length; i++) {
            // DELETE A TODO
            deleteButton[i].addEventListener('click', () => {
                outputItself[i].parentNode.removeChild(outputItself[i]);
                // DELETING A TODO
                todoObject.todo.todoContent.splice(i, 1);
                todoObject.todo.todoDate.splice(i, 1);
                todoObject.todo.todoTime.splice(i, 1);
                todoObject.todo.todoStatus.splice(i, 1);

                // SAVING THE OBJECT IN THE LOCAL STORAGE
                localStorage.setItem('todoObjectLS', JSON.stringify(todoObject));
            });

            // MARK A TODO AS FINISHED
            finishedButton[i].addEventListener('click', () => {
                if (outputItself[i].getAttribute('data-todo-status') === 'in progress') {
                    outputItself[i].classList.add('output-itself-finished');
                    outputItself[i].setAttribute('data-todo-status', 'finished');
                    finishedButton[i].textContent = 'IN PROGRESS';

                    todoObject.todo.todoStatus[i] = 'finished';
                    // SAVING THE OBJECT IN THE LOCAL STORAGE
                    localStorage.setItem('todoObjectLS', JSON.stringify(todoObject));
                } else {
                    outputItself[i].classList.remove('output-itself-finished');
                    outputItself[i].setAttribute('data-todo-status', 'in progress');
                    finishedButton[i].textContent = 'FINISHED';

                    todoObject.todo.todoStatus[i] = 'in progress';
                    // SAVING THE OBJECT IN THE LOCAL STORAGE
                    localStorage.setItem('todoObjectLS', JSON.stringify(todoObject));
                };
            });
        };
    };

};

displayStoredTodos();
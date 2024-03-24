import * as taskManagement from './taskManagement.js';

const addTaskBtn = document.getElementById('btn-add-task');
const addTaskPrompt = document.getElementById('add-task-prompt');
const addTaskCancelBtn = document.getElementById('add-task-cancel');
const addTaskNameInput = document.getElementById('add-task-name');
const addTaskDateInput = document.getElementById('add-task-date');

const addTaskForm = document.forms["add_task"];

function closeAddTaskPrompt() {
    addTaskBtn.style.display = 'inline';
    addTaskPrompt.style.display = 'none';
    addTaskForm.reset();
}

addTaskBtn.addEventListener('click', () => {
    console.log("Add task button pressed!");
    addTaskBtn.style.display = 'none';
    addTaskPrompt.style.display = 'flex';
    addTaskNameInput.focus();
});

addTaskCancelBtn.addEventListener('click', () => {
    closeAddTaskPrompt();
});

addTaskForm.onsubmit = function(event) {
    event.preventDefault();
    
    let name = addTaskNameInput.value.trim();
    let dueDate = addTaskDateInput.value;

    if (name === '') return;

    dueDate = dueDate != '' ? new Date(dueDate) : null;
    taskManagement.createTask(name, undefined, dueDate);
    closeAddTaskPrompt();
}
import * as taskManagement from './taskManagement.js';

const addTaskBtn = document.getElementById('btn-add-task');
const addTaskPrompt = document.getElementById('add-task-prompt');
const addTaskCancelBtn = document.getElementById('add-task-cancel');
const addTaskNameInput = document.getElementById('add-task-name');
const addTaskDateInput = document.getElementById('add-task-date');
const promptOverlay = document.getElementById('prompt-overlay');

const addTaskForm = document.forms["add_task"];

function closeAddTaskPrompt() {
    addTaskBtn.style.display = 'inline';
    addTaskPrompt.style.display = 'none';
    promptOverlay.style.display = 'none';
    addTaskForm.reset();
}

function showAddTaskPrompt() {
    addTaskBtn.style.display = 'none';
    addTaskPrompt.style.display = 'flex';
    promptOverlay.style.display = 'flex';
    addTaskNameInput.focus();
}

addTaskBtn.addEventListener('click', () => showAddTaskPrompt());
addTaskCancelBtn.addEventListener('click', () => closeAddTaskPrompt());
promptOverlay.addEventListener('click', () => {
    closeAddTaskPrompt();
});

addTaskForm.onsubmit = function(event) {
    event.preventDefault();
    
    let name = addTaskNameInput.value.trim();
    let dueDate = addTaskDateInput.value;

    if (name === '') return; // Task name is required

    dueDate = dueDate != '' ? new Date(dueDate) : null;
    taskManagement.createTask(name, undefined, dueDate);
    closeAddTaskPrompt();
}

window.addEventListener('editTask', (e) => {
    e.detail.taskID
});
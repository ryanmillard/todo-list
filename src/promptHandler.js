import { lightFormat } from 'date-fns';
import * as taskManagement from './taskManagement.js';
import * as storage from './storage.js';
import * as category from './category.js';

const addTaskBtn = document.getElementById('btn-add-task');
const addTaskPrompt = document.getElementById('add-task-prompt');
const addTaskCancelBtn = document.getElementById('add-task-cancel');
const addTaskNameInput = document.getElementById('add-task-name');
const addTaskDateInput = document.getElementById('add-task-date');
const promptOverlay = document.getElementById('prompt-overlay');
const promptContainer = document.getElementById('prompt-container');

const editTaskPrompt = document.getElementById('edit-task-prompt');
const editTaskCancelBtn = document.getElementById('edit-task-cancel');
const editTaskNameInput = document.getElementById('edit-task-name');
const editTaskDateInput = document.getElementById('edit-task-date');

const addTaskForm = document.forms["add_task"];
const editTaskForm = document.forms["edit_task"];

let currentEditingTaskID = null;

function formatDate(date) {
    return lightFormat(date, "yyyy-MM-dd");
}

function closeAddTaskPrompt() {
    addTaskBtn.style.display = 'inline';
    addTaskPrompt.style.display = 'none';
    promptContainer.style.display = 'none';
    addTaskForm.reset();
}

function showAddTaskPrompt() {
    addTaskBtn.style.display = 'none';
    addTaskPrompt.style.display = 'flex';
    promptContainer.style.display = 'flex';
    addTaskNameInput.focus();
}

function showEditTaskPrompt() {
    editTaskPrompt.style.display = 'flex';
    promptContainer.style.display = 'flex';
    editTaskNameInput.focus();
}

function closeEditTaskPrompt() {
    editTaskPrompt.style.display = 'none'
    promptContainer.style.display = 'none'
    editTaskForm.reset();
    currentEditingTaskID = null;
}

addTaskBtn.addEventListener('click', () => showAddTaskPrompt());
addTaskCancelBtn.addEventListener('click', () => closeAddTaskPrompt());
editTaskCancelBtn.addEventListener('click', () => closeEditTaskPrompt());

promptOverlay.addEventListener('click', () => {
    closeAddTaskPrompt();
    closeEditTaskPrompt();
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
    currentEditingTaskID = e.detail.taskID;
    let task = storage.getTaskByID(currentEditingTaskID);
    
    // Fill in form inputs with pre-existing data
    editTaskNameInput.value = task.name;
    if (task.dueDate !== null) {
        editTaskDateInput.value = formatDate(new Date(task.dueDate));
    }

    showEditTaskPrompt();
});

editTaskForm.onsubmit = function(event) {
    event.preventDefault();

    if (currentEditingTaskID === null) {
        closeEditTaskPrompt();
        return;
    }

    let task = storage.getTaskByID(currentEditingTaskID);
    if (task === undefined) {
        closeEditTaskPrompt();
        return;
    }

    let name = editTaskNameInput.value;
    let date = editTaskDateInput.value;
    let isDataChanged = false;

    if (name !== task.name) {
        isDataChanged = true;
        task.name = name;
    }

    if (date !== formatDate(task.dueDate)) {
        isDataChanged = true;
        task.dueDate = new Date(date);
    }

    if (isDataChanged) {
        category.taskUpdated(currentEditingTaskID);
    }

    closeEditTaskPrompt();
}
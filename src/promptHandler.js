import * as taskManagement from './taskManagement.js';

const addTaskBtn = document.getElementById('btn-add-task');
const addTaskPrompt = document.getElementById('add-task-prompt');

const addTaskForm = document.forms["add_task"];

addTaskBtn.addEventListener('click', () => {
    console.log("Add task button pressed!");
    addTaskBtn.style.display = 'none';
    addTaskPrompt.style.display = 'flex';
});

addTaskForm.onsubmit = function(event) {
    event.preventDefault();
    
    let name = document.getElementById('add-task-name').value.trim();
    console.log(name);
    
    if (name === '') return;

    addTaskBtn.style.display = 'inline';
    addTaskPrompt.style.display = 'none';
    taskManagement.createTask(name);
    addTaskForm.reset();
}
import './task.js';
import { Task } from './task.js';

let tasks = {};

export function loadStorage() {
    // Check if tasks exists in local storage
    if (localStorage.getItem("tasks") === null) {
        localStorage.setItem("tasks", '{}');
    } else {
        let savedTasks = JSON.parse(localStorage.getItem("tasks"));
        Object.keys(savedTasks).forEach(taskID => {
            let task = savedTasks[taskID];
            let rebuiltTask = new Task(task.name, task.creationDate, task.dueDate);
            rebuiltTask.trashed = task.trashed === undefined ? null : task.trashed;
            tasks[rebuiltTask.ID] = rebuiltTask;
        });
    }
}

export function updateStorage() {
    // {...tasks} and Object.assign({}, tasks) kept copying
    // by reference, so I had to use this instead.
    let tasksCopy = JSON.parse(JSON.stringify(tasks));
    
    Object.keys(tasksCopy).forEach(taskID => {
        Object.keys(tasksCopy[taskID]).forEach(key => {
            let value = tasksCopy[taskID][key];
            if (value === null
                || value === undefined
                || key === 'length'
                || key === 'ID')
            {
                delete tasksCopy[taskID][key];
            }
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasksCopy));
    console.log("localStorage:", JSON.stringify(tasksCopy));
}

export function storeNewTask(task) {
    tasks[task.ID] = task;
    console.log("Storing task", tasks[task.ID]);
    updateStorage();
}

export function deleteTask(taskID) {
    delete tasks[taskID];
    updateStorage();
}

export function getTaskByID(taskID) {
    return tasks[taskID];
}

export function getAllTasks() {
    return tasks;
}
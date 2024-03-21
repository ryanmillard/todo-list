import { Task } from './task.js';
import * as category from './category.js';
import * as storage from './storage.js';

window.addEventListener('trashTask', (e) => {
    console.log(e);
    console.log("trashTask: Binning", e.detail.taskID);
    trashTask(e.detail.taskID);
});

export function createTask(name) {
    let task = new Task(name);
    storage.storeNewTask(task);
    category.createTask(task);
}

export function trashTask(taskID) {
    let task = storage.getTaskByID(taskID);
    task.deleted = new Date();
    category.trashTask(taskID);
}

export function deleteTask(taskID) {
    storage.deleteTask(taskID);
}

export function completeTask(taskID) {
    let task = storage.getTaskByID(taskID);
    task.completed = new Date();
    
}
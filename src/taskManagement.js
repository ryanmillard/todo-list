import { Task } from './task.js';
import * as category from './category.js';
import * as storage from './storage.js';

window.addEventListener('trashTask', (e) => {
    console.log(e);
    console.log("trashTask: Binning", e.detail.taskID);
    trashTask(e.detail.taskID);
});

window.addEventListener('deleteTask', (e) => {
    console.log("deleteTask: Deleting", e.detail.taskID);
    deleteTask(e.detail.taskID);
});

window.addEventListener('completeTask', (e) => {
    console.log("completeTask: Completing", e.detail.taskID);
    completeTask(e.detail.taskID);
});

window.addEventListener('uncompleteTask', (e) => {
    uncompleteTask(e.detail.taskID);
});

export function createTask(name, creationDate, dueDate) {
    let task = new Task(name, creationDate, dueDate);
    storage.storeNewTask(task);
    category.createTask(task);
}

export function trashTask(taskID) {
    let task = storage.getTaskByID(taskID);
    task.trashed = new Date();
    category.trashTask(taskID);
}

export function deleteTask(taskID) {
    storage.deleteTask(taskID);
    category.deleteTask(taskID);
}

export function completeTask(taskID) {
    let task = storage.getTaskByID(taskID);
    task.completionDate = new Date();
    category.completeTask(taskID);
}

export function uncompleteTask(taskID) {
    let task = storage.getTaskByID(taskID);
    task.completionDate = null;
    category.uncompleteTask(taskID);
}
import { Task } from './task.js';
import * as category from './category.js';
import * as storage from './storage.js';

window.addEventListener('trashTask', (e) => trashTask(e.detail.taskID));
window.addEventListener('restoreTask', (e) => restoreTask(e.detail.taskID));
window.addEventListener('deleteTask', (e) => deleteTask(e.detail.taskID));
window.addEventListener('completeTask', (e) => completeTask(e.detail.taskID));
window.addEventListener('uncompleteTask', (e) => uncompleteTask(e.detail.taskID));

export function changeTaskAttribute(taskID, name, value) {
    let task = storage.getTaskByID(taskID);
    if (task === undefined) return;
    task[name] = value;
    storage.updateStorage();
}

export function createTask(name, creationDate, dueDate) {
    let task = new Task(name, creationDate, dueDate);
    storage.storeNewTask(task);
    category.createTask(task);
}

export function trashTask(taskID) {
    changeTaskAttribute(taskID, 'trashed', new Date());
    category.trashTask(taskID);
}

export function restoreTask(taskID) {
    changeTaskAttribute(taskID, 'trashed', null);
    category.restoreTask(taskID);
}

export function deleteTask(taskID) {
    storage.deleteTask(taskID);
    category.deleteTask(taskID);
}

export function completeTask(taskID) {
    changeTaskAttribute(taskID, 'completionDate', new Date());
    category.completeTask(taskID);
}

export function uncompleteTask(taskID) {
    changeTaskAttribute(taskID, 'completionDate', null);
    category.uncompleteTask(taskID);
}

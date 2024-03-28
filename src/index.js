import './style.scss';
import './taskManagement.js';
import './sidebar.js';
import './category.js';
import './promptHandler.js';
import * as storage from './storage.js';
import * as taskManagement from './taskManagement.js';
import { changeCategory, sortAllTasksIntoCategories } from './category.js';

storage.loadStorage();
sortAllTasksIntoCategories();
changeCategory('inbox');

if (localStorage.getItem("visited") === null) {
    localStorage.setItem("visited", true);
    taskManagement.createTask("Example 1");
    taskManagement.createTask("Example 2");
    taskManagement.createTask("Example 3");
}
import './style.scss';
import './taskManagement.js';
import './sidebar.js';
import './promptHandler.js';

import * as category from './category.js';
import * as storage from './storage.js';
import * as taskManagement from './taskManagement.js';

storage.loadStorage();
category.sortAllTasksIntoCategories();
category.changeCategory('inbox');

if (localStorage.getItem("visited") === null) {
    localStorage.setItem("visited", true);
    taskManagement.createTask("Example 1");
    taskManagement.createTask("Example 2");
    taskManagement.createTask("Example 3");
}
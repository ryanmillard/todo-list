import './style.scss';
import './taskManagement.js';
import './sidebar.js';
import './category.js';
import * as taskManagement from './taskManagement.js';

// let list = document.getElementsByClassName('category-list')[0];
// list.appendChild(createTask("Do this"));
// list.appendChild(createTask("Do that"));
// list.appendChild(createTask("Do nothing :("));

taskManagement.createTask("Example 1");
taskManagement.createTask("Example 2");
taskManagement.createTask("Example 3");
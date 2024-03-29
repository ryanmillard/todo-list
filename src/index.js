import './style.scss';
import './taskManagement';
import './sidebar';
import './promptHandler';

import * as category from './category';
import * as storage from './storage';
import * as taskManagement from './taskManagement';

storage.loadStorage();
category.sortAllTasksIntoCategories();
category.changeCategory('inbox');

if (localStorage.getItem('visited') === null) {
  localStorage.setItem('visited', true);
  taskManagement.createTask('Example 1');
  taskManagement.createTask('Example 2');
  taskManagement.createTask('Example 3');
}

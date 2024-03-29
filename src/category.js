import {
  isToday, isThisWeek, isThisMonth, isPast, formatDistanceToNowStrict,
} from 'date-fns';

import * as storage from './storage';

let currentCategory = '';

const pastDueRed = '#da7272';

const categories = {
  inbox: [],
  today: [],
  week: [],
  month: [],
  completed: [],
  pastDue: [],
  trash: [],
};

export function getCurrentCategoryName() {
  return currentCategory;
}

function getCategoryDisplayName(categoryName) {
  const displayNames = {
    inbox: 'Inbox',
    today: 'Today',
    week: 'This Week',
    month: 'This Month',
    completed: 'Completed',
    pastDue: 'Past Due',
    trash: 'Trash',
  };
  return displayNames[categoryName];
}

function createTaskUI(task) {
  function createTaskButton(iconName, isSolid, marginDirection, marginLength) {
    const iconType = isSolid ? 'fa-solid' : 'fa-regular';
    const icon = document.createElement('i');
    icon.classList.add('fa-xl', iconType, iconName);
    icon.style.cursor = 'pointer';
    if (marginDirection === 'left') icon.style.marginLeft = marginLength;
    if (marginDirection === 'right') icon.style.marginRight = marginLength;
    return icon;
  }

  const button = document.createElement('button');
  button.classList.add('btn-task');
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'space-between';

  const leftContainer = document.createElement('div');
  leftContainer.style.display = 'flex';
  leftContainer.style.alignItems = 'center';
  leftContainer.style.justifyContent = 'left';
  leftContainer.style.width = '65%';
  leftContainer.style.height = '100%';
  // leftContainer.style.backgroundColor = "red";

  const completedIcon = createTaskButton('fa-circle', false, 'left', '10px');
  leftContainer.appendChild(completedIcon);

  const span = document.createElement('span');
  span.textContent = task.name;
  span.style.padding = '10px';
  span.style.fontSize = '1rem';
  span.style.textOverflow = 'ellipsis';
  span.style.overflow = 'hidden';
  leftContainer.appendChild(span);

  button.appendChild(leftContainer);

  function checkTask() {
    completedIcon.classList.add('fa-circle-check', 'fa-solid');
    completedIcon.classList.remove('fa-circle', 'fa-regular');
    completedIcon.style.color = '#fff';
    button.style.opacity = '50%';
    span.style.textDecoration = 'line-through';
  }

  function uncheckTask() {
    completedIcon.classList.add('fa-circle', 'fa-regular');
    completedIcon.classList.remove('fa-circle-check', 'fa-solid');
    completedIcon.style.color = '';
    button.style.opacity = '';
    span.style.textDecoration = '';
  }

  if (task.completionDate !== null) {
    checkTask();
  }

  completedIcon.addEventListener('click', () => {
    const currentTask = storage.getTaskByID(task.ID);
    if (currentTask.completionDate === null) {
      checkTask();
      window.dispatchEvent(new CustomEvent('completeTask', {
        detail: { taskID: task.ID },
      }));
    } else {
      uncheckTask();
      window.dispatchEvent(new CustomEvent('uncompleteTask', {
        detail: { taskID: task.ID },
      }));
    }
  });

  const rightContainer = document.createElement('div');
  rightContainer.style.display = 'flex';
  rightContainer.style.alignItems = 'center';
  rightContainer.style.justifyContent = 'right';
  rightContainer.style.width = '35%';
  rightContainer.style.height = '100%';
  // rightContainer.style.backgroundColor = "blue";

  let editIcon;
  let trashIcon;
  let restoreIcon;
  let deleteIcon;
  let calendarIcon;
  let calendarSpan;

  if (task.trashed === null) {
    editIcon = createTaskButton('fa-pen-to-square', true, 'right', '13px');
    editIcon.style.display = 'none';
    rightContainer.appendChild(editIcon);

    trashIcon = createTaskButton('fa-trash-can', true, 'right', '10px');
    trashIcon.style.display = 'none';
    rightContainer.appendChild(trashIcon);

    editIcon.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('editTask', {
        detail: { taskID: task.ID },
      }));
    });

    trashIcon.addEventListener('click', () => {
      button.remove();
      window.dispatchEvent(new CustomEvent('trashTask', {
        detail: { taskID: task.ID },
      }));
    }, { once: true });
  } else {
    restoreIcon = createTaskButton('fa-clock-rotate-left', true, 'right', '10px');
    restoreIcon.style.display = 'none';
    rightContainer.appendChild(restoreIcon);

    deleteIcon = createTaskButton('fa-trash-can', true, 'right', '10px');
    deleteIcon.style.display = 'none';
    rightContainer.appendChild(deleteIcon);

    restoreIcon.addEventListener('click', () => {
      button.remove();
      window.dispatchEvent(new CustomEvent('restoreTask', {
        detail: { taskID: task.ID },
      }));
    }, { once: true });

    deleteIcon.addEventListener('click', () => {
      button.remove();
      window.dispatchEvent(new CustomEvent('deleteTask', {
        detail: { taskID: task.ID },
      }));
    }, { once: true });
  }

  if (task.dueDate !== null) {
    calendarIcon = createTaskButton('fa-calendar', true);
    rightContainer.appendChild(calendarIcon);

    const distance = formatDistanceToNowStrict(task.dueDate);

    calendarSpan = document.createElement('span');
    calendarSpan.style.padding = '10px';
    calendarSpan.style.fontSize = '0.85rem';
    calendarSpan.style.fontWeight = 'bold';
    rightContainer.appendChild(calendarSpan);

    if (isPast(task.dueDate)) {
      calendarSpan.textContent = `${distance} late`;
      calendarSpan.style.color = pastDueRed;
      calendarIcon.style.color = pastDueRed;
    } else {
      calendarSpan.textContent = `Due in ${distance}`;
    }
  }

  button.appendChild(rightContainer);

  button.addEventListener('mouseenter', () => {
    if (task.trashed === null) {
      editIcon.style.display = 'inline-block';
      trashIcon.style.display = 'inline-block';
    } else {
      restoreIcon.style.display = 'inline-block';
      deleteIcon.style.display = 'inline-block';
    }

    if (task.dueDate !== null) {
      calendarSpan.style.display = 'none';
      calendarIcon.style.display = 'none';
    }
  });

  button.addEventListener('mouseleave', () => {
    if (task.trashed === null) {
      editIcon.style.display = 'none';
      trashIcon.style.display = 'none';
    } else {
      restoreIcon.style.display = 'none';
      deleteIcon.style.display = 'none';
    }

    if (task.dueDate !== null) {
      calendarSpan.style.display = 'inline-block';
      calendarIcon.style.display = 'inline-block';
    }
  });

  const list = document.getElementById('category-list');
  list.appendChild(button);
}

function renderCategory(categoryName) {
  const categoryList = document.getElementById('category-list');
  categoryList.textContent = '';

  const categoryMessage = document.getElementById('category-message');

  if (categories[categoryName].length === 0) {
    categoryMessage.textContent = `No tasks to display for ${getCategoryDisplayName(categoryName).toLowerCase()}.`;
    categoryMessage.style.display = '';
  } else {
    categoryMessage.style.display = 'none';
  }

  categories[categoryName].forEach((taskID) => {
    createTaskUI(storage.getTaskByID(taskID));
  });
}

function changeCategoryTitle(categoryName) {
  const categoryTitle = document.getElementById('category-title');
  categoryTitle.textContent = getCategoryDisplayName(categoryName);
}

export function sortTaskIntoCategories(taskID) {
  const task = storage.getTaskByID(taskID);

  if (task.trashed) {
    categories.trash.push(taskID);
    return;
  }

  if (task.completionDate !== null) {
    categories.completed.push(taskID);
  }

  if (task.dueDate !== null) {
    // Determine what time categories it can go in
    if (isToday(task.dueDate)) categories.today.push(taskID);
    if (isThisWeek(task.dueDate)) categories.week.push(taskID);
    if (isThisMonth(task.dueDate)) categories.month.push(taskID);
    if (isPast(task.dueDate)) categories.pastDue.push(taskID);
  }

  categories.inbox.push(taskID);
}

function removeTaskFromCategory(taskID, categoryName) {
  const category = categories[categoryName];
  const index = category.indexOf(taskID);
  if (index === -1) return;
  categories[categoryName].splice(index, 1);
}

function removeTaskFromAllCategories(taskID) {
  Object.keys(categories).forEach((categoryName) => {
    removeTaskFromCategory(taskID, categoryName);
  });
}

export function trashTask(taskID) {
  removeTaskFromAllCategories(taskID);
  categories.trash.push(taskID);

  // Refresh category if needed to display message
  if (categories[currentCategory].length !== 0) return;
  renderCategory(currentCategory);
}

export function restoreTask(taskID) {
  removeTaskFromCategory(taskID, 'trash');
  sortTaskIntoCategories(taskID);

  // Refresh category if needed to display message
  if (currentCategory !== 'trash') return;
  if (categories[currentCategory].length !== 0) return;
  renderCategory(currentCategory);
}

export function completeTask(taskID) {
  if (storage.getTaskByID(taskID).trashed !== null) return;
  categories.completed.push(taskID);
}

export function uncompleteTask(taskID) {
  removeTaskFromCategory(taskID, 'completed');
}

export function deleteTask(taskID) {
  removeTaskFromAllCategories(taskID);

  // Refresh category if needed to display message
  if (currentCategory !== 'trash') return;
  if (categories[currentCategory].length !== 0) return;
  renderCategory(currentCategory);
}

export function changeCategory(categoryName) {
  if (categoryName === currentCategory) return;
  changeCategoryTitle(categoryName);
  renderCategory(categoryName);
  currentCategory = categoryName;
}

export function createTask(task) {
  sortTaskIntoCategories(task.ID);
  renderCategory(currentCategory);
}

export function taskUpdated() {
  renderCategory(currentCategory);
}

export function sortAllTasksIntoCategories() {
  const tasks = storage.getAllTasks();

  Object.keys(tasks).forEach((taskID) => {
    sortTaskIntoCategories(taskID);
  });
}

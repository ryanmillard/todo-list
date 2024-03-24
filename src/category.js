import * as storage from './storage.js';
import { isToday, isThisWeek, isThisMonth, isPast } from 'date-fns';

let currentCategory = "inbox";

// types of categories
// today
// week
// month
// completed
// past due

let categories = {
    "inbox": [],
    "today": [],
    "week": [],
    "month": [],
    "completed": [],
    "pastDue": [],
    "trash": []
}

export function sortAllTasks() {
    let tasks = storage.getAllTasks();

    for (const taskID in tasks) {
        sortTaskIntoCategories(taskID);
    }
}

export function sortTaskIntoCategories(taskID) {
    const task = storage.getTaskByID(taskID);
    
    if (task.deleted) {
        categories["trash"].push(taskID);
        return;
    }

    if (task.completionDate !== null) {
        categories["completed"].push(taskID);
    }

    if (task.dueDate !== null) {
        // Determine what time categories it can go in
        if (isToday(task.dueDate)) categories["today"].push(taskID);
        if (isThisWeek(task.dueDate)) categories["week"].push(taskID);
        if (isThisMonth(task.dueDate)) categories["month"].push(taskID);
        if (isPast(task.dueDate)) categories["pastDue"].push(taskID);
    }

    categories["inbox"].push(taskID);
}

sortAllTasks();

function removeTaskFromCategory(taskID, categoryName) {
    let category = categories[categoryName];
    let index = category.indexOf(taskID);
    if (index === -1) return;
    categories[categoryName].splice(index, 1);
}

export function trashTask(taskID) {
    for (const categoryName in categories) {
        removeTaskFromCategory(taskID, categoryName);
    }
    categories['trash'].push(taskID);
}

export function completeTask(taskID) {
    if (storage.getTaskByID(taskID).deleted !== null) return;
    categories['completed'].push(taskID);
}

export function uncompleteTask(taskID) {
    removeTaskFromCategory(taskID, 'completed');
}

function createTaskUI(task) {
    
    function createTaskButton(iconName, isSolid, marginDirection, marginLength) {
        let iconType = isSolid ? 'fa-solid' : 'fa-regular'
        let icon = document.createElement("i");
        icon.classList.add('fa-xl', iconType, iconName);
        icon.style.cursor = "pointer";
        if (marginDirection == "left") icon.style.marginLeft = marginLength;
        if (marginDirection == "right") icon.style.marginRight = marginLength;
        return icon;
    }

    function checkTask() {
        completedIcon.classList.add('fa-circle-check', 'fa-solid');
        completedIcon.classList.remove('fa-circle', 'fa-regular');
        completedIcon.style.color = "#fff";
        button.style.opacity = "50%";
        span.style.textDecoration = "line-through";
    }

    function uncheckTask() {
        completedIcon.classList.add('fa-circle', 'fa-regular');
        completedIcon.classList.remove('fa-circle-check', 'fa-solid');
        completedIcon.style.color = "";
        button.style.opacity = "";
        span.style.textDecoration = "";
    }

    let button = document.createElement('button');
    button.classList.add('btn-task');
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "space-between";

    let leftContainer = document.createElement("div");
    leftContainer.style.display = "flex";
    leftContainer.style.alignItems = "center";
    leftContainer.style.justifyContent = "left";
    leftContainer.style.width = "50%";
    leftContainer.style.height = "100%";
    // leftContainer.style.backgroundColor = "red";

    let completedIcon = createTaskButton('fa-circle', false, "left", "10px");
    leftContainer.appendChild(completedIcon);

    let span = document.createElement("span");
    span.textContent = task.name;
    span.style.padding = "10px";
    span.style.fontSize = "1rem";
    span.style.textOverflow = "ellipsis";
    span.style.overflow = "hidden";
    leftContainer.appendChild(span);

    button.appendChild(leftContainer);

    if (task.completionDate !== null) {
        checkTask();
    }

    completedIcon.addEventListener('click', () => {
        let currentTask = storage.getTaskByID(task.ID);
        if (currentTask.completionDate === null) {
            checkTask();
            window.dispatchEvent(new CustomEvent('completeTask', {
                detail: { "taskID": task.ID }
            }));
        } else {
            uncheckTask();
            window.dispatchEvent(new CustomEvent('uncompleteTask', {
                detail: { "taskID": task.ID }
            }));
        }
    });

    let rightContainer = document.createElement('div');
    rightContainer.style.display = "none";
    rightContainer.style.alignItems = "center";
    rightContainer.style.justifyContent = "right";
    rightContainer.style.width = "10%";
    rightContainer.style.height = "100%";

    let editIcon = createTaskButton('fa-pen-to-square', true, "right", "13px");
    rightContainer.appendChild(editIcon);

    let deleteIcon = createTaskButton('fa-trash-can', true, "right", "10px");
    rightContainer.appendChild(deleteIcon);

    deleteIcon.addEventListener('click', () => {
        button.remove();

        console.log("delete button clicked", task, task.ID);
        window.dispatchEvent(new CustomEvent('trashTask', {
            detail: { "taskID": task.ID }
        }));
    }, {once: true});

    button.appendChild(rightContainer);

    button.addEventListener('mouseenter', () => {
        rightContainer.style.display = "flex";
    });

    button.addEventListener('mouseleave', () => {
        rightContainer.style.display = "none";  
    });

    let list = document.getElementById('category-list');
    list.appendChild(button);
}

export function changeCategory(categoryName) {
    if (categoryName === currentCategory) return;
    console.log("Changing category to", categoryName);
    changeCategoryTitle(categoryName);
    renderCategory(categoryName);
    currentCategory = categoryName;
}

function getCategoryDisplayName(categoryName) {
    let displayNames = {
        "inbox": "Inbox",
        "today": "Today",
        "week": "This Week",
        "month": "This Month",
        "completed": "Completed",
        "pastDue": "Past Due",
        "trash": "Trash"
    }
    return displayNames[categoryName];
}

function changeCategoryTitle(categoryName) {
    let categoryTitle = document.getElementById('category-title');
    categoryTitle.textContent = getCategoryDisplayName(categoryName);
}
export function createTask(task) {
    sortTaskIntoCategories(task.ID);
    renderCategory(currentCategory);
}

function renderCategory(categoryName) {
    let categoryList = document.getElementById('category-list');
    categoryList.textContent = '';

    let categoryMessage = document.getElementById('category-message');

    if (categories[categoryName].length === 0) {
        categoryMessage.textContent = `No tasks to display for ${getCategoryDisplayName(categoryName).toLowerCase()}.`;
        categoryMessage.style.display = '';
    } else {
        categoryMessage.style.display = "none";
    }

    categories[categoryName].forEach(taskID => {
        createTaskUI(storage.getTaskByID(taskID));
    });
}

console.log("Categories:", categories);

export function getCurrentCategoryName() {
    return currentCategory;
}
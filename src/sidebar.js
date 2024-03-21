import * as category from './category.js';

let inboxBtn = document.getElementById('inbox-btn');
let todayBtn = document.getElementById('today-btn');
let weekBtn = document.getElementById('week-btn');
let monthBtn = document.getElementById('month-btn');
let completedBtn = document.getElementById('completed-btn');
let pastDueBtn = document.getElementById('past-due-btn');
let trashBtn = document.getElementById('trash-btn');

inboxBtn.addEventListener('click', () => {
    category.changeCategory('inbox');
});

todayBtn.addEventListener('click', () => {
    category.changeCategory('today');
});

weekBtn.addEventListener('click', () => {
    category.changeCategory('week');
});

monthBtn.addEventListener('click', () => {
    category.changeCategory('month');
});

completedBtn.addEventListener('click', () => {
    category.changeCategory('completed');
});

pastDueBtn.addEventListener('click', () => {
    category.changeCategory('pastDue');
});

trashBtn.addEventListener('click', () => {
    category.changeCategory('trash');
});
import * as category from './category';

const categoryButtons = {
  inbox: document.getElementById('inbox-btn'),
  today: document.getElementById('today-btn'),
  week: document.getElementById('week-btn'),
  month: document.getElementById('month-btn'),
  completed: document.getElementById('completed-btn'),
  pastDue: document.getElementById('past-due-btn'),
  trash: document.getElementById('trash-btn'),
};

Object.keys(categoryButtons).forEach((categoryName) => {
  const button = categoryButtons[categoryName];
  button.addEventListener('click', () => {
    const currentCategoryName = category.getCurrentCategoryName();
    categoryButtons[currentCategoryName].classList.remove('btn-side-selected');
    categoryButtons[categoryName].classList.add('btn-side-selected');
    category.changeCategory(categoryName);
  });
});

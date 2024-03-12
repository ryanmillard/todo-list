import './style.scss';

function createTask(i) {
    let button = document.createElement('button');
    button.classList.add('btn-task');
    button.textContent = "hi";

    let checkbox = document.createElement('div');
    checkbox.style = "background-color: red;";
    checkbox.textContent = "no";

    return button;
}

let list = document.getElementsByClassName('category-list')[0];
list.appendChild(createTask("hii"));
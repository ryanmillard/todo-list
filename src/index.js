import './style.scss';
import './task.js';
import './storage.js';

function createTask(taskDescription) {
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

    let icon = document.createElement("i");
    icon.classList.add('fa-xl', 'fa-circle', 'fa-regular');
    icon.style.cursor = "pointer";
    icon.style.marginLeft = "10px";
    leftContainer.appendChild(icon);

    let span = document.createElement("span");
    span.textContent = taskDescription;
    span.style.padding = "10px";
    span.style.fontSize = "1rem";
    span.style.textOverflow = "ellipsis";
    span.style.overflow = "hidden";
    leftContainer.appendChild(span);

    button.appendChild(leftContainer);

    let checked = false;

    icon.addEventListener('click', () => {
        if (!checked) {
            icon.classList.add('fa-circle-check', 'fa-solid');
            icon.classList.remove('fa-circle', 'fa-regular');
            icon.style.color = "#72abda";
            checked = true;
            button.style.opacity = "50%";
            span.style.textDecoration = "line-through";
        } else {
            icon.classList.add('fa-circle', 'fa-regular');
            icon.classList.remove('fa-circle-check', 'fa-solid');
            icon.style.color = "";
            checked = false;
            button.style.opacity = "";
            span.style.textDecoration = "";
        }
    });

    let rightContainer = document.createElement('div');
    rightContainer.style.display = "none";
    rightContainer.style.alignItems = "center";
    rightContainer.style.justifyContent = "right";
    rightContainer.style.width = "10%";
    rightContainer.style.height = "100%";
    // rightContainer.style.display = "none";
    // rightContainer.style.backgroundColor = "red";

    let editIcon = document.createElement("i");
    editIcon.classList.add('fa-xl', 'fa-pen-to-square', 'fa-solid');
    editIcon.style.cursor = "pointer";
    editIcon.style.marginRight = "13px";
    rightContainer.appendChild(editIcon)
    //<i class="fa-solid fa-pen-to-square"></i>

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add('fa-xl', 'fa-trash-can', 'fa-solid');
    deleteIcon.style.cursor = "pointer";
    deleteIcon.style.marginRight = "10px";
    rightContainer.appendChild(deleteIcon);

    deleteIcon.addEventListener('click', () => {
        button.remove();
    });

    button.appendChild(rightContainer);

    //<i class="far fa-circle-check fa-xl" style="margin-left: 10px; cursor: pointer;"></i>

    button.addEventListener('mouseenter', () => {
        rightContainer.style.display = "flex";
    });

    button.addEventListener('mouseleave', () => {
        rightContainer.style.display = "none";  
    });

    return button;
}

let list = document.getElementsByClassName('category-list')[0];
list.appendChild(createTask("Do this"));
list.appendChild(createTask("Do that"));
list.appendChild(createTask("Do nothing :("));
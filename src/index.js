import './style.scss';
import './task.js';
import './storage.js';

function createTask(taskDescription) {
    
    function createTaskButton(iconName, isSolid, marginDirection, marginLength) {
        let iconType = isSolid ? 'fa-solid' : 'fa-regular'
        let icon = document.createElement("i");
        icon.classList.add('fa-xl', iconType, iconName);
        icon.style.cursor = "pointer";
        if (marginDirection == "left") icon.style.marginLeft = marginLength;
        if (marginDirection == "right") icon.style.marginRight = marginLength;
        return icon;
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
    span.textContent = taskDescription;
    span.style.padding = "10px";
    span.style.fontSize = "1rem";
    span.style.textOverflow = "ellipsis";
    span.style.overflow = "hidden";
    leftContainer.appendChild(span);

    button.appendChild(leftContainer);

    let checked = false;

    completedIcon.addEventListener('click', () => {
        if (!checked) {
            completedIcon.classList.add('fa-circle-check', 'fa-solid');
            completedIcon.classList.remove('fa-circle', 'fa-regular');
            completedIcon.style.color = "#72abda";
            checked = true;
            button.style.opacity = "50%";
            span.style.textDecoration = "line-through";
        } else {
            completedIcon.classList.add('fa-circle', 'fa-regular');
            completedIcon.classList.remove('fa-circle-check', 'fa-solid');
            completedIcon.style.color = "";
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

    let editIcon = createTaskButton('fa-pen-to-square', true, "right", "13px");
    rightContainer.appendChild(editIcon);

    let deleteIcon = createTaskButton('fa-trash-can', true, "right", "10px");
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
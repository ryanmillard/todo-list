import './style.scss';

function createTask(taskDescription) {
    let button = document.createElement('button');
    button.classList.add('btn-task');

    let leftContainer = document.createElement("div");
    leftContainer.style.display = "flex";
    leftContainer.style.alignItems = "center";
    leftContainer.style.justifyContent = "left";
    leftContainer.style.width = "50%";

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
        } else {
            icon.classList.add('fa-circle', 'fa-regular');
            icon.classList.remove('fa-circle-check', 'fa-solid');
            icon.style.color = "";
            checked = false;
            button.style.opacity = "";
        }
    });

    //<i class="far fa-circle-check fa-xl" style="margin-left: 10px; cursor: pointer;"></i>

    return button;
}

let list = document.getElementsByClassName('category-list')[0];
list.appendChild(createTask("Do this"));
list.appendChild(createTask("Do that"));
list.appendChild(createTask("Do nothing :("));
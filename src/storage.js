let tasks = [];

localStorage.setItem("tasks", "[]");

// Check if tasks exists in local storage
if (localStorage.getItem("tasks") === null) {
    localStorage.setItem("tasks", JSON.stringify([]));
} else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
}

console.log(localStorage.getItem('tasks') === null);
console.log(localStorage);

function updateStorage() {
    let tasksCopy = tasks.map((e) => e);

    for (let i = 0; i < tasksCopy.length; i++) {
        Object.keys(tasksCopy[i]).forEach(key => {
            let value = tasksCopy[i][key];
            if (value === null
                || value === undefined
                || key === 'length')
            {
                delete tasksCopy[i][key];
            }
        });
    }

    localStorage.setItem("tasks", JSON.stringify(tasksCopy));
    console.log(JSON.stringify(tasksCopy));
}

function storeTask(task) {
    console.log(tasks);
    tasks.push(task);
    updateStorage();
}

module.exports = {
    storeTask
}
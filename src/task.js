function Task(name) {
    let creationDate = new Date();
    let dueDate = null;
    let priority = null;
    let starred = null;
    return { name, creationDate, dueDate, priority };
}

module.exports = { Task };
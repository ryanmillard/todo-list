export class Task {
    constructor(name) {
        this.name = name;
        this.creationDate = new Date();
        this.completionDate = null;
        this.priority = null;
        this.isStarred = null;
    }

    isCompleted() {
        return this.completionDate === null;
    }
}
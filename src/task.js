export class Task {
    constructor(name, creationDate) {
        this.name = name;
        this.creationDate = creationDate === undefined ? new Date() : creationDate;
        
        // Create Unique ID so this task can be identified easily:
        // TODO: Creates UUID then converts it to Base64 to save space.
        this.ID = crypto.randomUUID().replace(/-/g, '');
        
        this.completionDate = null;
        this.dueDate = null;
        this.priority = null;
        this.starred = null;
        this.deleted = null;
    }

    isCompleted() {
        return this.completionDate === null;
    }

    isPastDue() {
        if (this.dueDate === null) return false; // No due date set
        if (this.completionDate !== null) return false; // Already completed
        return this.dueDate.now() > new Date().now();
    }

    isStarred() {
        return this.starred !== null;
    }

    completeTask() {
        this.completionDate = new Date();
    }
}
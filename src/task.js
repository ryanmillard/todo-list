export class Task {
    constructor(name, creationDate, dueDate) {
        this.name = name;
        this.creationDate = creationDate === undefined ? new Date() : creationDate;
        
        // Create Unique ID so this task can be identified easily:
        // TODO: Creates UUID then converts it to Base64 to save space.
        this.ID = crypto.randomUUID().replace(/-/g, '');
        
        this.completionDate = null;
        this.dueDate = dueDate === undefined ? null : dueDate;
        this.priority = null;
        this.starred = null;
        this.trashed = null;
    }
}
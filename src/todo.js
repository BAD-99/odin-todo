export default class Todo {
    constructor(title, description, dueDate, priority, checklist) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checklist = checklist;
    }
    markComplete(complete) {
        if (complete === undefined) {
            this.complete = true;
            return;
        }
        this.complete = complete;
    }
}

export class Check {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
}
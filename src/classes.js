// todos, name, color
export class Project {
    constructor(todos, name, color) {
        this.todos = todos;
        this.name = name;
        this.color = color;
    }
    addTodos(todos) {
        this.todos.push(todos);
    }
    removeComplete() {
        this.todos = this.todos.filter((todo) => todo.complete);
    }
    removeTodo(todo){
        // this.todos
    }
}

export class Todo {
    constructor(name, description, dueDate, priority) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    markComplete(complete) {
        this.complete = complete;
    }
}
// todos, name, color
export default class Project {
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
}
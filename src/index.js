import Project from "./classes";
// import Todo from "./todo";
import Todo, { Check } from "./todo";
// 55d6be acfcd9 7d5ba6 dddddd fc6471
const defaultProject = new Project([], 'Default Project', '#55d6be');
console.log('hello world!');
console.log(defaultProject.color);
// const j = new Todo()
defaultProject.addTodos(new Todo('Test', 'I am a test!'));
console.log(defaultProject);
console.table(defaultProject.todos);
document.body.style.backgroundColor = defaultProject.color;
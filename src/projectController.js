import { Project, Todo, Check } from "./classes";
import * as storage from './storageController';

const projects = storage.loadProjects();

export function logProjects() {
    console.log(projects);
}

export function getProjects() {
    return projects;
}

export function addProject(project) {
    projects.push(project);
    console.table(projects);
}

export function removeCompletedTodos() {
    projects.forEach(project => {
        project.removeComplete();
    });
}

export function getTodos(compareFn) {
    let todos = [];
    projects.forEach(project => {
        todos = todos.concat(project.todos);
    });
    if (compareFn !== undefined) {
        todos.sort(compareFn);
    }
    return todos;
}
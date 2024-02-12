import { formatRelative } from "date-fns";
import { Project, Todo, Check } from "./classes";
import * as projectController from './projectController';

const sidebar = document.createElement('div');
sidebar.classList.add('sidebar');
const content = document.createElement('div');
content.classList.add('content');
const dialog = document.createElement('dialog');

document.body.append(sidebar, content, dialog);

//make sorting for projects and todo, make project and todo dissplays

// sidebar




function displaySidebar(selected) {
    const sideToday = document.createElement('button');
    sideToday.textContent = 'Today';
    const sideUpcoming = document.createElement('button');
    sideUpcoming.textContent = 'Upcoming';
    const sideAddProject = document.createElement('button');

    const projectList = document.createElement('ul');
    const allProjectsLi = document.createElement('li');
    const allProjectsButton = document.createElement('button');
    allProjectsButton.textContent = 'All Projects';
    allProjectsLi.append(allProjectsButton);
    projectList.append(allProjectsLi);
    if (selected === undefined) {
        allProjectsButton.classList.toggle('selected-project', true);
        projectController.getProjects().forEach(project => {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.textContent = project.name;
            li.append(btn);
            projectList.append(li);
        })
    }
    else {
        projectController.getProjects.forEach(project => {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.textContent = project.name;
            li.append(btn);
            projectList.append(li);
            if (project === selected) { btn.classList.toggle('selected-project', true); }
        })
    }



    sideAddProject.textContent = 'New Project';
    sideAddProject.addEventListener('click', () => {
        newProjectDialog();
    })
    console.log('sidebar')
    sidebar.replaceChildren(sideToday, sideUpcoming, projectList, sideAddProject);
}
//

function closeDialog() {
    dialog.close();
}

function displayDialog(element) {
    dialog.replaceChildren(element);
    dialog.showModal();
}

function createProjectCard(project) {
    //project, title name, colored label, todos
    const card = document.createElement('div');
    card.classList.add('project-card');

    const name = document.createElement('h1');
    name.innerText = project.name;
    if (project.color !== undefined) {
        name.style.backgroundColor = project.color;
    }

    const newTodoButton = document.createElement('button');
    newTodoButton.textContent = 'New todo';
    newTodoButton.addEventListener('click', () => {
        newTodoDialog(project);
    })

    const todoList = document.createElement('ul');
    project.todos.forEach(todo => {
        todoList.append(createTodo(todo));
    });

    card.append(name, newTodoButton, todoList);
    return card;
}

function createTodo(todo) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('click', () => {
        todo.markComplete(checkbox.checked)
    });
    checkbox.checked = todo.complete;
    // console.log(todo.complete);
    const span = document.createElement('span');
    span.innerText = todo.name;
    li.append(checkbox, span);

    if (todo.dueDate !== undefined) {
        const date = makeDate(todo.dueDate);
        // date.textContent = todo.dueDate;
        li.append(date);
    }

    if (todo.description !== undefined) {
        const desc = document.createElement('div');
        desc.textContent = todo.description;
        li.append(desc);
    }


    return li;
    // todoList.append(li);
}

function makeDate(date) {
    // let dt = date.split('^[T]')
    const date = document.createElement('div');
    date.textContent = date;
    return date;
}

export function updateDisplay() { displayProjects(); displaySidebar(); }

export function displayProjects() {
    const cards = projectController.getProjects().map(project => createProjectCard(project));
    content.replaceChildren(...cards, removeComplete);
}

function displaySingleProject(project) {
    const card = createProjectCard(project);
    content.replaceChildren(card, removeComplete);
}

const removeComplete = document.createElement('button');
removeComplete.textContent = 'Remove Completed Todos';
removeComplete.addEventListener('click', () => {
    removeCompletedTodos();
    projectController.removeCompletedTodos();
});

export function removeCompletedTodos() {
    const checks = content.querySelectorAll('input[type="checkbox"]');
    checks.forEach(check => {
        if (check.checked) { check.parentElement.remove(); }
    })
}

function newTodoDialog(project) {
    const form = document.createElement('form');

    const labelName = document.createElement('label');
    labelName.textContent = 'Name:'
    const formName = document.createElement('input');
    formName.setAttribute('type', 'text');
    formName.required = true;
    labelName.append(formName);

    const labelDescription = document.createElement('label');
    labelDescription.textContent = 'Description:'
    const formDescription = document.createElement('input');
    formDescription.setAttribute('type', 'text');
    labelDescription.append(formDescription);

    const labelDueDate = document.createElement('label');
    labelDueDate.textContent = 'Due Date:'
    const formDueDate = document.createElement('input');
    formDueDate.setAttribute('type', 'datetime-local');
    labelDueDate.append(formDueDate);

    const labelPriority = document.createElement('label');
    labelPriority.textContent = 'Priority:'
    const formPriority = document.createElement('input');
    formPriority.setAttribute('list', 'priority-list');
    labelPriority.append(formPriority);

    const formPriorityDatalist = document.createElement('datalist');
    formPriorityDatalist.id = 'priority-list';
    const priorities = ['Low', 'Med', 'High'];
    priorities.forEach(priority => {
        let option = document.createElement('option');
        option.value = priority;
        formPriorityDatalist.append(option);
    });

    const formSubmit = document.createElement('button');
    formSubmit.textContent = 'Add Todo';
    formSubmit.setAttribute('type', 'submit');

    const formCancel = document.createElement('button');
    formCancel.textContent = 'Cancel';
    formCancel.setAttribute('type', 'button');
    formCancel.addEventListener('click', () => { closeDialog(); })

    form.append(labelName, labelDueDate, labelDescription, formSubmit, formCancel);

    form.addEventListener('submit', event => {
        closeDialog();
        const todo = new Todo(
            formName.value,
            formDescription.value !== '' ? formDescription.value : undefined,
            formDueDate.value !== '' ? formDueDate.value : undefined
        );
        console.log(todo);
        project.addTodos(todo);
        updateDisplay();
        event.preventDefault();
    })

    displayDialog(form);
}

function newProjectDialog() {
    const form = document.createElement('form');
    form.id = 'new-project';

    const labelName = document.createElement('label');
    labelName.textContent = 'Name:'
    const formName = document.createElement('input');
    formName.setAttribute('type', 'text');
    formName.required = true;
    labelName.append(formName);

    const labelColor = document.createElement('label');
    labelColor.textContent = 'Color:';
    const formColor = document.createElement('input');
    formColor.setAttribute('type', 'color');
    formColor.defaultValue = '#55d6be';
    labelColor.append(formColor);

    const formSubmit = document.createElement('button');
    formSubmit.setAttribute('type', 'submit');
    formSubmit.textContent = 'Add Project';
    form.addEventListener('submit', event => {
        closeDialog();
        projectController.addProject(
            new Project([], formName.value, formColor.value)
        );
        updateDisplay();
        event.preventDefault();
    });

    const formCancel = document.createElement('button');
    formCancel.textContent = 'Cancel';
    formCancel.setAttribute('type', 'button');
    formCancel.addEventListener('click', () => { closeDialog(); })

    form.append(labelName, labelColor, formSubmit, formCancel);
    displayDialog(form);
}
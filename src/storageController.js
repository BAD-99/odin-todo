import { Project, Todo, Check } from "./classes";

export function loadProjects() {
    return [
        new Project([
                new Todo('My Todo', 'I am a todo!'),
                new Todo('My other Todo', "I'm a different todo!")
            ],
            'Default Project',
            '#55d6be'
        ),
        new Project([
            new Todo('First Todo', 'Do first task'),
            new Todo('Last Todo', 'Do last task')
        ],
        'Next Project',
        '#e5a049'
        ),
    ]
}

export function saveProjects(projects) {
    return;
}
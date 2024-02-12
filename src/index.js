import { Project, Todo, Check } from "./classes";
import * as projectController from './projectController';
import * as domController from './domController';
import './style.css';

const defaultProjects = projectController.getProjects();
domController.updateDisplay();


// console.table(projectController.getTodos());
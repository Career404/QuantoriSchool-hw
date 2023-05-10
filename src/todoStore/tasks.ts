import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface initialState {
	tasks: Task[];
}

const initialState: initialState = {
	tasks: [
		{
			title: 'Default state',
			isCompleted: false,
			dateDueJson: '2023-04-20T00:00:00.000Z',
			tag: 'health',
			id: '1682004086244',
			dateCreated: '2023-04-20T00:00:00.000Z',
			lastUpdated: '1682004086244',
		},
	],
};
const privateInitialState: initialState = {
	tasks: [
		{
			title: 'Default PRIVATE state',
			isCompleted: false,
			dateDueJson: '2023-04-20T00:00:00.000Z',
			tag: 'health',
			id: '1682004086244',
			dateCreated: '2023-04-20T00:00:00.000Z',
			lastUpdated: '1682004086244',
		},
	],
};

const createTasksSlice = (sliceName: string, initialState: initialState) => {
	return createSlice({
		name: sliceName,
		initialState,
		reducers: {
			//createSlice creates actions from reducers as 'domain/eventName'
			// Redux Toolkit (Immer) allows mutating in reducers.
			initTodo: (state, action: PayloadAction) => {
				console.log(state);
			},
			setAllTasks: (state, action: PayloadAction<{ tasks: Task[] }>) => {
				state.tasks = action.payload.tasks;
			},
			addTask: (state, action: PayloadAction<{ task: Task }>) => {
				state.tasks.push(action.payload.task);
			},
			editTask: (state, action: PayloadAction<{ task: Task }>) => {
				const index = state.tasks.findIndex(
					(task) => task.id === action.payload.task.id
				);
				if (index !== -1) {
					state.tasks[index] = action.payload.task;
				}
			},
			checkTask: (state, action: PayloadAction<{ id: string }>) => {
				const task = state.tasks.find((task) => task.id === action.payload.id);
				if (task) {
					task.isCompleted = !task.isCompleted;
				}
			},
			deleteTask: (state, action: PayloadAction<{ id: string }>) => {
				state.tasks = state.tasks.filter(
					(task) => task.id !== action.payload.id
				);
			},
		},
	});
};

//<Record<string, {actions: SliceActions<>}> https://stackoverflow.com/questions/64576133/get-action-types-from-redux-toolkits-createslice
const tasksByName: any = {};

export const initTodo = (taskName: string) =>
	tasksByName[taskName].actions.initTodo;
export const setAllTasks = (taskName: string) =>
	tasksByName[taskName].actions.setAllTasks;
export const addTask = (taskName: string) =>
	tasksByName[taskName].actions.addTask;
export const editTask = (taskName: string) =>
	tasksByName[taskName].actions.editTask;
export const checkTask = (taskName: string) =>
	tasksByName[taskName].actions.checkTask;
export const deleteTask = (taskName: string) =>
	tasksByName[taskName].actions.deleteTask;

const createTasks = (name: string, initialState: initialState) => {
	const slice = createTasksSlice(name, initialState);
	tasksByName[name] = {
		actions: slice.actions,
	};
	return slice;
};
export const tasksSlice = createTasks('tasks', initialState);
export const privateTasksSlice = createTasks(
	'privateTasks',
	privateInitialState
);

export const selectTasks =
	(taskName: 'tasks' | 'privateTasks') => (state: RootState) =>
		state[taskName].tasks;

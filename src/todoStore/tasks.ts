import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: { tasks: Task[]; privateTasks: Task[] } = {
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
	privateTasks: [
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
// 2 separate stores seems to be a better solution, but it's not recommended by Redux team and absolutely everybody else
// https://stackoverflow.com/questions/33619775/redux-multiple-stores-why-not
//? Make 'private' radically simpler, remove Redux store and so on

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		// Redux Toolkit (Immer) allows 'mutating' the reducers.
		setAllTasks: (
			state,
			action: PayloadAction<{ tasks: Task[]; isPrivate: boolean }>
		) => {
			action.payload.isPrivate
				? (state.privateTasks = action.payload.tasks)
				: (state.tasks = action.payload.tasks);
		},
		addTask: (
			state,
			action: PayloadAction<{ task: Task; isPrivate: boolean }>
		) => {
			if (action.payload.isPrivate) {
				state.privateTasks.push(action.payload.task);
			} else {
				state.tasks.push(action.payload.task);
			}
		},
		checkTask: (
			state,
			action: PayloadAction<{ id: string; isPrivate: boolean }>
		) => {
			const tasks = action.payload.isPrivate ? state.privateTasks : state.tasks;
			const task = tasks.find((task) => task.id === action.payload.id);
			if (task) {
				task.isCompleted = !task.isCompleted;
			}
		},
		deleteTask: (
			state,
			action: PayloadAction<{ id: string; isPrivate: boolean }>
		) => {
			action.payload.isPrivate
				? (state.privateTasks = state.privateTasks.filter(
						(task) => task.id !== action.payload.id
				  ))
				: (state.tasks = state.tasks.filter(
						(task) => task.id !== action.payload.id
				  ));
		},
	},
});
export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectPrivateTasks = (state: RootState) =>
	state.tasks.privateTasks;

//createSlice creates actions as 'domain/eventName'
export const { setAllTasks, addTask, checkTask, deleteTask } =
	tasksSlice.actions;
export default tasksSlice.reducer;

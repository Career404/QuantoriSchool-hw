import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: { tasks: Task[] } = {
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

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		// Redux Toolkit (Immer) allows 'mutating' the reducers.
		addTask: (state, action: PayloadAction<Task>) => {
			state.tasks.push(action.payload);
		},
		checkTask: (state, action: PayloadAction<string>) => {
			const task = state.tasks.find((task) => task.id === action.payload);
			if (task) {
				task.isCompleted = !task.isCompleted;
			}
		},
		deleteTask: (state, action: PayloadAction<string>) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
		},
	},
});
export const selectTasks = (state: RootState) => state.tasks;

//createSlice creates actions as 'domain/eventName'
export const { addTask, checkTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;

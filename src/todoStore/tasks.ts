import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

//I have a strong feeling that creating slices dynamically was a lot of time wasted for nothing.

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

const createTasksSlice = (
	sliceName: string,
	initialState: initialState,
	extraReducers?: {
		[key: string]: (state: any, action: PayloadAction<any>) => void;
	}
) =>
	createSlice({
		name: sliceName,
		initialState,
		reducers: {
			//createSlice creates actions from reducers as 'domain/eventName'
			// Redux Toolkit (Immer) allows mutating in reducers.
			setAllTasks: (state, action: PayloadAction<{ tasks: Task[] }>) => {
				state.tasks = action.payload.tasks;
			},
			addTask: (state, action: PayloadAction<{ task: Task }>) => {
				state.tasks.push(action.payload.task);
			},
			editTask: (state, action: PayloadAction<{ task: Task }>) => {
				state.tasks = state.tasks.map((task) =>
					task.id === action.payload.task.id ? action.payload.task : task
				);
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
		extraReducers: extraReducers
			? (builder) => {
					Object.entries(extraReducers).forEach(([actionType, reducer]) => {
						builder.addCase(actionType, reducer);
					});
			  }
			: undefined,
	});

//<Record<string, {actions: SliceActions<>}> https://stackoverflow.com/questions/64576133/get-action-types-from-redux-toolkits-createslice
const tasksByName: any = {};

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

const createTasks = (
	name: string,
	initialState: initialState,
	extraReducers?: {
		[key: string]: (state: any, action: PayloadAction<any>) => void;
	}
) => {
	let slice = createTasksSlice(name, initialState, extraReducers!);

	tasksByName[name] = {
		actions: slice.actions,
	};
	return slice;
};

const tasksExtraReducers = {
	setAllTasks: createAsyncThunk('tasks/setAllTasks', async () => {
		const response = await fetch('http://localhost:3004/tasks');
		return await response.json();
	}),
	addTask: createAsyncThunk('tasks/addTask', async (task) => {
		console.log('adding task to server via thunk');
		const response = await fetch('http://localhost:3004/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(task),
		});
		return await response.json();
	}),
};
console.log(tasksExtraReducers);

export const tasksSlice = createTasks(
	'tasks',
	initialState,
	tasksExtraReducers
);
export const privateTasksSlice = createTasks(
	'privateTasks',
	privateInitialState
);

export const selectTasks =
	(taskName: 'tasks' | 'privateTasks') => (state: RootState) =>
		state[taskName].tasks;

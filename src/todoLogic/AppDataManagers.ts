import { store } from '../todoStore/store';
import { AUTH } from '../utility/auth/auth';
import DataManager from './DataManager';
import { getAllTasks } from './dbOps';
/*
export const dailyManager = new DataManager({
	id: AUTH + '-daily',
}); */

export const tasksManager = new DataManager({
	id: AUTH + '-tasks',
	store: store,
	actions: [
		{
			name: 'initTodo',
			ServerAction: getAllTasks,
		},
	],
});

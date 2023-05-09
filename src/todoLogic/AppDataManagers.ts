import { AUTH } from '../utility/auth/auth';
import DataManager from './DataManager';

export const dailyManager = new DataManager({
	id: AUTH + '-daily',
});

export const tasksManager = new DataManager({
	id: AUTH + '-tasks',
	server: [
		{
			url: 'http://localhost:3004/tasks',
			methodAlias: 'getAllTasks',
			cacheResponse: true,
		},
		{
			url: 'http://localhost:3004/tasks',
			methodAlias: 'addNewTask',
			method: 'POST',
		},
		{
			url: `http://localhost:3004/tasks/`,
			methodAlias: 'deleteTaskById',
			method: 'DELETE',
		},
	],
});

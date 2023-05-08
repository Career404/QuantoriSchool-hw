import { AUTH } from '../utility/auth/auth';
import DataManager from './DataManager';

export const lastUpdatedManager = new DataManager({
	id: AUTH + '-lastUpdated',
	server: [
		{ url: 'http://localhost:3004/lastUpdated' },
		{
			url: 'http://localhost:3004/lastUpdated',
			method: 'PUT',
			methodAlias: 'setToNow',
		},
	],
	localStorage: true,
});

export const tasksManager = new DataManager({
	id: AUTH + '-tasks',
	server: [
		{
			url: 'http://localhost:3004/tasks',
			methodAlias: 'getAllTasks',
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
	localStorage: true,
});

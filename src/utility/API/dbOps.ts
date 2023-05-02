export async function getLastUpdatedServer() {
	try {
		const response = await fetch('http://localhost:3004/lastUpdated');
		const date = await response.json();
		return date.date;
	} catch (err) {
		throw err;
	}
}
export async function setLastUpdatedServer(date: number) {
	try {
		const response = await fetch(`http://localhost:3004/lastUpdated`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ date: date }),
		});
		return response;
	} catch (err) {
		throw err;
	}
}
export async function getAllTasks() {
	try {
		const response = await fetch('http://localhost:3004/tasks');
		const tasks = await response.json();
		return tasks;
	} catch (err) {
		throw err;
	}
}
export async function setAllTasks(taskArray: Task[]) {
	try {
		const response = await fetch('http://localhost:3004/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(taskArray),
		});
		const tasks = await response.json();
		return tasks;
	} catch (err) {
		throw err;
	}
}
export async function addNewTask(task: Task) {
	try {
		const response = await fetch('http://localhost:3004/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(task),
		});
		return await response.json();
	} catch (err) {
		throw err;
	}
}
export async function deleteTaskById(id: string) {
	try {
		const response = await fetch(`http://localhost:3004/tasks/${id}`, {
			method: 'DELETE',
		});
		return await response.json();
	} catch (err) {
		throw err;
	}
}
export async function updateTaskById(id: string, updates: Task) {
	try {
		const response = await fetch(`http://localhost:3004/tasks/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updates),
		});
		return await response.json();
	} catch (err) {
		throw err;
	}
}

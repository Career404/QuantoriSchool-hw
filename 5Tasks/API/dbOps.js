export async function getLastUpdated() {
	try {
		const response = await fetch('http://localhost:3004/lastUpdated');
		const date = await response.json();
		return date.date;
	} catch (err) {
		throw err;
	}
}
export async function setLastUpdated(date) {
	try {
		const response = await fetch(`http://localhost:3004/lastUpdated`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ date: date }),
		});
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
export async function addNewTask(task) {
	try {
		const response = await fetch('http://localhost:3004/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(task),
		});
	} catch (err) {
		throw err;
	}
}
export async function deleteTaskById(id) {
	try {
		const response = await fetch(`http://localhost:3004/tasks/${id}`, {
			method: 'DELETE',
		});
	} catch (err) {
		throw err;
	}
}
export async function updateTaskById(id, updates) {
	try {
		const response = await fetch(`http://localhost:3004/tasks/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updates),
		});
	} catch (err) {
		throw err;
	}
}

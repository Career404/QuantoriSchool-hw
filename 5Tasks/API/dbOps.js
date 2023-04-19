export async function checkLastUpdated() {
	try {
		const response = await fetch('http://localhost:3004/lastUpdated');
		return await response.json();
	} catch (error) {
		console.log(error);
		return undefined;
	}
}
export async function setLastUpdatedNow() {
	try {
		const response = await fetch('http://localhost:3004/lastUpdated', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify([Date.now().toString()]),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}
export async function getAllTasks() {
	const response = await fetch('http://localhost:3004/tasks');
	const tasks = await response.json();
	return tasks;
}
export async function addNewTask(task) {
	const response = await fetch('http://localhost:3004/tasks', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(task),
	});
	setLastUpdatedNow();
	const newTask = await response.json();
	return newTask;
}
export async function deleteTaskById(id) {
	const response = await fetch(`http://localhost:3004/tasks/${id}`, {
		method: 'DELETE',
	});
	setLastUpdatedNow();
	const result = await response.json();
	return result;
}
export async function updateTaskById(id, updates) {
	const response = await fetch(`http://localhost:3004/tasks/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(updates),
	});
	setLastUpdatedNow();
	const updatedTask = await response.json();
	return updatedTask;
}

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
		const newTask = await response.json();
		return newTask;
	} catch (err) {
		throw err;
	}
}
export async function deleteTaskById(id) {
	try {
		const response = await fetch(`http://localhost:3004/tasks/${id}`, {
			method: 'DELETE',
		});
		const result = await response.json();
		return result;
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
		const updatedTask = await response.json();
		return updatedTask;
	} catch (err) {
		throw err;
	}
}

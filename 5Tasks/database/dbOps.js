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
	const newTask = await response.json();
	return newTask;
}
export async function deleteTaskById(id) {
	const response = await fetch(`http://localhost:3004/tasks/${id}`, {
		method: 'DELETE',
	});
	const result = await response.json();
	return result;
}
export async function updateTaskById(id, updates) {
	const response = await fetch(`http://localhost:3004/tasks/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(updates),
	});
	const updatedTask = await response.json();
	return updatedTask;
}

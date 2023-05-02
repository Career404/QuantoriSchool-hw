//* Every function needs more testing (JSON-server occasionally crashes with EADDRINUSE)
// Possibly too many calls at once? click fast to replicate
// Happens outside useEffect, React.strictMode is not a likely suspect
// JSON-server to blame? no EADDRINUSE after the addition of --host flag
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
export async function updateAllTasks(taskArray: Task[]) {
	try {
		const tasks = await getAllTasks();
		const updatedTasks = tasks.map((serverTask: Task) => {
			const matchingTask = taskArray.find(
				(localTask) => localTask === serverTask
			);
			return matchingTask ?? serverTask;
		});

		const localIds = taskArray.map((task) => task.id);
		const tasksToDelete = updatedTasks.filter(
			(task: Task) => !localIds.includes(task.id)
		);
		tasksToDelete.forEach(async (task: Task) => await deleteTaskById(task.id));

		await Promise.all(
			taskArray.map(async (task) => {
				const existingTask = tasks.find((taskT: Task) => taskT.id === task.id);
				existingTask
					? await updateTaskById(task.id, task)
					: await addNewTask(task);
			})
		);
		return updatedTasks;
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

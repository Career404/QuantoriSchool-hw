const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
type HTTPMETHODS = 'GET' | 'POST' | 'PUT' | 'DELETE';

//* Every function needs more testing (JSON-server occasionally crashes with EADDRINUSE)
// Possibly too many calls at once? click fast to replicate
// Happens outside useEffect, React.strictMode is not a likely suspect
// JSON-server to blame? no EADDRINUSE after the addition of --host flag

//these catch blocks are only here to stop the error propagation to where the functions are called
/*
export async function getLastUpdatedServer() {
	try {
		const response = await fetch('http://localhost:3004/lastUpdated');
		if (!response.ok) {
			throw new Error('server failed to load LAST UPDATED');
		}
		const date = await response.json();
		return date.date;
	} catch (err) {
		throw { message: 'failed getLastUpdatedServer', err };
	}
}
 */
/* export async function setLastUpdatedServer(date: number) {
	try {
		const response = await fetch(`http://localhost:3004/lastUpdated`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ date: date }),
		});
		if (!response.ok) {
			throw new Error('server failed to set LAST UPDATED');
		}
		return response;
	} catch (err) {
		throw { message: 'failed setLastUpdatedServer', err };
	}
} */

export async function addNewTask(task: Task) {
	try {
		const response = await fetch('http://localhost:3004/tasks', {
			method: POST,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(task),
		});
		if (!response.ok) {
			throw new Error('server failed to ADD NEW TASK');
		}
		return await response.json();
	} catch (err) {
		throw { message: 'failed addNewTask', err };
	}
}

/* export async function updateAllTasks(taskArray: Task[]) {
	//!
	//* it's a mess
	try {
		const tasks = await getAllTasks();
		const updatedTasks = tasks.map((serverTask: Task) => {
			const matchingTask = taskArray.find(
				(localTask) => localTask === serverTask
			);
			return matchingTask ?? serverTask;
		});

		const localIds = new Set(taskArray.map((task) => task.id));
		const tasksToDelete = updatedTasks.filter(
			(task: Task) => !localIds.has(task.id)
		);
		await Promise.all(
			tasksToDelete.map(async (task: Task) => await deleteTaskById(task.id))
		);

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
		throw { message: 'failed getAllTasks', err };
	}
} */

/*
export async function deleteTaskById(id: string) {
	try {
		const response = await fetch(`http://localhost:3004/tasks/${id}`, {
			method: 'DELETE',
		});
		if (!response.ok) {
			throw new Error('server failed to DELETE TASK');
		}
		return await response.json();
	} catch (err) {
		throw { message: 'failed deleteTaskById', err };
	}
}
export async function updateTaskById(id: string, updates: Task) {
	try {
		const response = await fetch(`http://localhost:3004/tasks/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updates),
		});
		if (!response.ok) {
			throw new Error('server failed to UPDATE TASK');
		}
		return await response.json();
	} catch (err) {
		throw { message: 'failed updateTaskById', err };
	}
}
 */

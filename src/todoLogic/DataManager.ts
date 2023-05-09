interface httpRequest {
	//? add typing with generics to body
	url: string;
	method?: string;
	methodAlias?: string;
	headers?: Record<string, string>;
	cacheResponse?: boolean;
	responseCallback?: (data: any) => void;
}
interface serverFunctionProps {
	params?: string;
	body?: string;
}

interface StorageManagerOptions {
	id: string;
	server?: httpRequest[];
}

function createServerFunction(request: httpRequest) {
	const { url, method, headers } = request;
	return async function (serverFunctionProps?: serverFunctionProps) {
		const { body, params } = serverFunctionProps ?? {};
		const fullUrl = params ? url + params : url;
		const response = await fetch(fullUrl, {
			method,
			headers: headers ?? { 'Content-Type': 'application/json' },
			body: body ? body : undefined,
		});
		if (!response.ok) {
			throw new Error(`server failed to ${method} ${url}`);
		}
		const data = await response.json();
		return data;
	};
}

export default class DataManager {
	private id: string;
	serverOps: Record<
		string,
		(serverFunctionProps?: serverFunctionProps) => Promise<any>
	> = {};
	newData = (data: any, name?: string) => {
		localStorage.setItem(name || this.id, JSON.stringify(data));
	};
	getData = async (name?: string) =>
		await JSON.parse(
			localStorage.getItem(name || this.id) ??
				`{
			"title": "No active tasks",
			"isCompleted": false,
			"dateDueJson": "2023-04-20T00:00:00.000Z",
			"tag": "health",
			"id": "1682004086244",
			"dateCreated": "2023-04-20T00:00:00.000Z",
			"lastUpdated": "1682004086244"
		}`
		);

	constructor(options: StorageManagerOptions) {
		this.id = options.id;
		if (options.server) {
			for (const request of options.server) {
				request.method = request.method || 'GET';
				const alias = request.methodAlias ?? request.method.toLowerCase();
				const serverFunction = createServerFunction(request);
				if (request.cacheResponse) {
					this.serverOps[alias] = async () => {
						let data;
						try {
							data = await serverFunction();
							this.newData(data, this.id + '-' + alias);
						} catch (err) {
							console.log(err);
							data = JSON.parse(localStorage.getItem(options.id) ?? 'null');
						}
						if (request.responseCallback) {
							request.responseCallback(data);
						}
						return data;
					};
				} else {
					this.serverOps[alias] = async () => {
						try {
							const data = await serverFunction();
							if (request.responseCallback) {
								request.responseCallback(data);
							}
							return data;
						} catch (err) {
							console.log(err);
						}
					};
				}
			}
		}
	}
}
//const get = () =>

/* export async function todoLoader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	console.log('todoLoaderTriggered:', url);
	const q = url.searchParams.get('q');
	const id = url.href.includes('server') ? AUTH : GENERIC_USER_ID;
	const items: Task[] = await getItems(id, q);
	return { items, q, id };
}

export function getItems(userId: string, q?: string | null) {
	const item = localStorage.getItem(`${userId}-Items`);
	const result = item
		? JSON.parse(item)
		: [
				{
					title: 'no items in localStorage',
					isCompleted: false,
					dateDueJson: '2023-04-13T16:11:22.697Z',
					tag: 'home',
					id: '16813158826971',
				},
		  ];
	//! Filtering by search query in get localStorage function! refactor - move filtering to a separate func
	return q
		? result.filter((item: Task) =>
				item.title.toLowerCase().includes(q.toLowerCase())
		  )
		: result;
}


const isLocalNewer = (remoteDate: number) =>
	lastUpdated > remoteDate
		? true
		: lastUpdated === remoteDate
		? 'equal'
		: false;

const addUpdateDate = () => {
	const date = Date.now();
	if (!offlineInstance) {
		setLastUpdatedServer(date);
	}
	setLastUpdated(date);
};
const loadItems = () => {
	if (!offlineInstance && navigator.onLine) {
		getLastUpdatedServer()
			.then((date) => {
				setIsOnline(true);
				const isNewerOrEqual = isLocalNewer(date);
				if (isNewerOrEqual === 'equal') {
					console.log('everything up to date');
				} else if (isNewerOrEqual) {
					updateAllTasks(items);
					addUpdateDate();
					console.log('updated server from local');
				} else {
					getAllTasks().then((tasks) => {
						setItems(tasks);
						setLastUpdated(date);
						console.log('updated local from server');
					});
				}
			})
			.catch((err) => {
				console.log(err);
				if (isOnline) {
					setIsOnline(false);
				}
			});
	}
};

const handleCheckbox = (id: string) => {
	const newItems = items.map((item) =>
		item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
	);
	if (!offlineInstance) {
		const checkedItem = items.find((item) => item.id === id);
		updateTaskById(id, checkedItem!)
			.then(() => {
				console.log('updatedTaskToServer');
				if (!isOnline) {
					setIsOnline(true);
				}
			})
			.catch((err) => {
				if (isOnline) {
					setIsOnline(false);
				}
			});
	}
	addUpdateDate();
	setItems(newItems);
};

const handleRemove = (id: string) => {
	const newItems = items.filter((item) => item.id !== id);
	if (!offlineInstance) {
		deleteTaskById(id)
			.then(() => {
				console.log('deletedTaskToServer');
				if (!isOnline) {
					setIsOnline(true);
				}
			})
			.catch((err) => {
				if (isOnline) {
					setIsOnline(false);
				}
			});
	}
	addUpdateDate();
	setItems(newItems);
};

const handleCreateNewTask = (task: Task) => {
	if (!offlineInstance) {
		addNewTask(task)
			.then(() => {
				console.log('newTaskToServer');
				if (!isOnline) {
					setIsOnline(true);
				}
			})
			.catch((err) => {
				if (isOnline) {
					setIsOnline(false);
				}
			});
	}
	addUpdateDate();
	setItems([...items, task]);
};
 */

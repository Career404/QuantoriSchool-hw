import { GENERIC_USER_ID } from '../utility/auth/auth';

interface httpRequest {
	//? add typing with generics to body
	url: string;
	method?: string;
	methodAlias?: string;
	headers?: Record<string, string>;
}
interface serverFunctionProps {
	params?: string;
	body?: string;
}

interface StorageManagerOptions {
	id: string;
	server?: httpRequest[];
	localStorage?: boolean;
	defaultData?: any;
}

//! any?
const localStorable = (id: string) => {
	const set = (newData: any) => {
		localStorage.setItem(id, JSON.stringify(newData));
	};
	const get = () => JSON.parse(localStorage.getItem(id) ?? 'null');
	return { set, get };
};

function createServerFunction(
	request: httpRequest
): (serverFunctionProps?: serverFunctionProps) => Promise<any> {
	const { url, method, headers } = request;
	return async function (serverFunctionProps?: serverFunctionProps) {
		const { body, params } = serverFunctionProps ?? {};
		const fullUrl = params ? url + params : url;
		const response = await fetch(fullUrl, {
			method,
			headers: headers ?? { 'Content-Type': 'application/json' },
			body: body ? JSON.stringify(body) : undefined,
		});
		if (!response.ok) {
			throw new Error(`server failed to ${method} ${url}`);
		}
		return response.json();
	};
}

function serverStorable(server: httpRequest[]) {
	const serverOps: Record<string, (a?: serverFunctionProps) => Promise<any>> =
		{};
	for (const request of server) {
		request.method = request.method || 'GET';
		const alias = request.methodAlias ?? request.method.toLowerCase();
		serverOps[alias] = createServerFunction(request);
	}
	return serverOps;
}

export default class DataManager {
	private id: string;
	currentData: any;
	localStorageOps?: { set: (newData: any) => void; get: () => any };
	serverOps: Record<string, (a?: serverFunctionProps) => Promise<any>> = {};

	constructor(options: StorageManagerOptions) {
		this.id = options.id;
		this.currentData = options.defaultData ?? undefined;
		if (options.localStorage) {
			this.localStorageOps = localStorable(options.id);
		}
		if (options.server) {
			this.serverOps = serverStorable(options.server) || {};
		}
	}
	current(): any {
		return this.currentData;
	}
	getFilteredData = (callback: (item: any) => any) =>
		this.currentData.filter(callback);
}

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
export function setItems(userId: string, updates: Object) {
	localStorage.setItem(`${userId}-Items`, JSON.stringify(updates));
}
export function getLastUpdated(userId: string) {
	return localStorage.getItem(`${userId}-lastUpdated`);
}
export function setLastUpdated(userId: string, date = Date.now()) {
	localStorage.setItem(`${userId}-lastUpdated`, date.toString());
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

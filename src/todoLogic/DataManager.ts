interface ActionData {
	name: string;
	triggerActionType?: string;
	ServerAction?: (data?: any) => Promise<any>;
	cacheData?: boolean;
}

interface DataManagerOptions {
	id: string;
	store: any;
	actions: ActionData[];
}
/**
 * creates a listener that calls a server function, saves the response body to localStorage and dispatches a specified action with the response body as payload
 */
class DataStream {
	private id: string;
	public store: any;

	constructor(id: string, store: any) {
		this.id = id;
		this.store = store;
	}
	newData = (data: any, name?: string) => {
		localStorage.setItem(name || this.id, JSON.stringify(data));
	};
	getData = async (name?: string) => {
		const result = localStorage.getItem(name || this.id);
		return result ? await JSON.parse(result) : undefined;
	};
	createListener = (action: ActionData) => {
		let { name, triggerActionType, ServerAction } = action;
		triggerActionType = triggerActionType ?? name;

		this.store.subscribe(() => {
			const state = this.store.getState();
			if (ServerAction) {
				ServerAction()
					.then((response) => {
						console.log('Server action complete, ', response);
					})
					.catch((err) => console.log(err));
			}
		});
		console.log(this.store);
	};
}

export default class DataManager {
	private id: string;
	dataStreams: Record<string, any> = {};

	constructor(options: DataManagerOptions) {
		this.id = options.id;
		for (let action of options.actions) {
			this.dataStreams[action.name] = new DataStream(options.id, options.store);
			this.dataStreams[action.name].createListener(action);
		}
	}

	sayHi = () => console.log('hi, I am your manager today', this);
}
/*


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

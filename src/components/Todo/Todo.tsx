import { useState, useEffect, useRef } from 'react';
import useLocalStorage from '../../utility/localStorage/localstorage';
import {
	getLastUpdatedServer,
	setLastUpdatedServer,
	getAllTasks,
	setAllTasks,
	addNewTask,
	deleteTaskById,
	updateTaskById,
} from '../../utility/API/dbOps';

import ListItem from './ListItem/ListItem';
import Modal from './Modal/Modal';
import WeatherWidget from './Weather/WeatherWidget';

export default function Todo(
	{ offlineInstance = false, userId = 'genericUserId' } /* : {
	offlineInstance?: boolean;
} */
) {
	const [items, setItems] = useLocalStorage(`${userId}-Items`, [
		{
			title: 'If weather is not displayed correctly, click it to load new data',
			isCompleted: false,
			dateDueJson: '2023-04-13T16:11:22.697Z',
			tag: 'home',
			id: '16813158826971',
		},
		{
			title:
				'Try to connect with the server by clicking on the round status icon in the top-right of the screen',
			isCompleted: false,
			dateDueJson: '2023-04-12T16:11:22.697Z',
			tag: 'work',
			id: '16813158826972',
		},
		{
			title:
				'These tasks are saved in localStorage, but will update from server when server will come online',
			isCompleted: false,
			dateDueJson: '2023-04-11T16:11:22.697Z',
			tag: 'health',
			id: '16813158826973',
		},
	]);
	const [lastUpdated, setLastUpdated] = useLocalStorage(
		`${userId}-lastUpdated`,
		0
	);
	const [isOnline, setIsOnline] = useState(false);
	const [searchRequest, setSearchRequest] = useState('');
	const [newTaskIsOpen, setNewTaskIsOpen] = useState(false);

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

	useEffect(() => {
		if (!offlineInstance && navigator.onLine) {
			getLastUpdatedServer()
				.then((date) => {
					setIsOnline(true);
					const isNewerOrEqual = isLocalNewer(date);
					if (isNewerOrEqual === 'equal') {
						console.log('everything up to date');
					} else if (isNewerOrEqual) {
						setAllTasks(items);
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
				.catch((err) => console.log(err));
		}
	}, [offlineInstance]);

	const filteredItems = items.filter((item) =>
		item.title.toLowerCase().includes(searchRequest.toLowerCase())
	);
	const notcompletedItems = filteredItems.filter(
		(item) => item.isCompleted !== true
	);
	const completedItems = filteredItems.filter(
		(item) => item.isCompleted === true
	);

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
					console.log(err);
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
					console.log(err);
					if (isOnline) {
						setIsOnline(false);
					}
				});
		}
		addUpdateDate();
		setItems(newItems);
	};

	const createNewTask = (task: Task) => {
		if (!offlineInstance) {
			addNewTask(task)
				.then(() => {
					console.log('newTaskToServer');
					if (!isOnline) {
						setIsOnline(true);
					}
				})
				.catch((err) => {
					console.log(err);
					if (isOnline) {
						setIsOnline(false);
					}
				});
		}
		addUpdateDate();
		setItems([...items, task]);
	};

	return (
		<div className="main">
			<div className="title">
				<h1>To Do List</h1>
				<WeatherWidget />
			</div>
			<div className="search-bar">
				<input
					type="text"
					name="search"
					id="search"
					placeholder="Search Task"
					value={searchRequest}
					onChange={(e) => setSearchRequest(e.target.value)}
				/>
				<button className="button" onClick={() => setNewTaskIsOpen(true)}>
					+ New Task
				</button>
			</div>
			<h2>All Tasks</h2>
			<ul>
				{notcompletedItems.map((item) => (
					<ListItem
						key={item.id}
						item={item}
						clickCheckbox={() => handleCheckbox(item.id)}
						removeItem={() => handleRemove(item.id)}
					/>
				))}
			</ul>
			<h2>Completed Tasks</h2>
			<ul className="completed-list">
				{completedItems.map((item) => (
					<ListItem
						key={item.id}
						item={item}
						clickCheckbox={() => handleCheckbox(item.id)}
						removeItem={() => handleRemove(item.id)}
					/>
				))}
			</ul>
			{!offlineInstance && <StatusIcon isOnline={isOnline} />}
			{newTaskIsOpen && (
				<Modal onClose={() => setNewTaskIsOpen(false)}>
					<h3>New Task</h3>
					<TaskCreator
						close={() => setNewTaskIsOpen(false)}
						accept={createNewTask}
					/>
				</Modal>
			)}
		</div>
	);
}

function TaskCreator({
	close = () => {
		console.log('No close behaviour specified');
	},
	accept = (task: Task) => {
		console.log('No accept behaviour specified');
	},
}) {
	//No point in making this a separate component (this is only done to re-render less on setNewTaskTitle)
	const [newTaskTitle, setNewTaskTitle] = useState('');

	const availableTags = ['health', 'work', 'home', 'other'];
	let selectedTag: string = 'health';
	let selectedDate: string = new Date().toJSON().slice(0, 10);

	return (
		<>
			<div className="taskCreator">
				<input
					type="text"
					className="newTaskTitle"
					id="newTaskTitle"
					placeholder="Task Title"
					minLength={1}
					autoFocus
					onChange={(e) => {
						setNewTaskTitle(e.target.value);
					}}
				/>
				<div className="newTask-more">
					<div className="tagSelector">
						{availableTags.map((tag, index) => (
							<label
								className={`li-tag newTaskTag li-tag-${tag}`}
								tabIndex={0}
								key={tag}
								onClick={() => {
									selectedTag = tag;
								}}
								onKeyDown={(e) => {
									if (e.code === 'Space' || e.key === 'Enter') {
										(e.target as HTMLElement).click();
									}
								}}
							>
								<input
									type="radio"
									id="tag"
									name="tag"
									className="radioTab"
									defaultChecked={index === 0}
								></input>
								{tag}
							</label>
						))}
					</div>
					<input
						type="date"
						className="datePicker"
						defaultValue={selectedDate}
						onChange={(e) => {
							selectedDate = e.target.value;
						}}
					/>
				</div>
			</div>
			<div className="buttons-container">
				<button className="button cancel-button" onClick={close}>
					Cancel
				</button>
				<button
					className="button agree-button"
					onClick={() => {
						accept({
							title: newTaskTitle,
							isCompleted: false,
							dateDueJson: new Date(selectedDate).toJSON(),
							tag: selectedTag,
							id: new Date().getTime().toString(),
						});
						close();
					}}
					disabled={!!!newTaskTitle}
				>
					Add Task
				</button>
			</div>
		</>
	);
}

function StatusIcon({ isOnline = false }) {
	const statusColor = isOnline ? 'green' : 'red';
	const text = isOnline ? 'Connected' : 'No connection';

	return (
		<div
			className="notification"
			style={{ backgroundColor: statusColor }}
			onClick={() => console.log('click Notification')}
		>
			<p>{text}</p>
		</div>
	);
}

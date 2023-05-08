import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Form, Outlet, useSubmit } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../todoStore/hooks';
import {
	addTask,
	checkTask,
	deleteTask,
	selectPrivateTasks,
	selectTasks,
	setAllTasks,
} from '../../todoStore/tasks';

import ListItem from './ListItem/ListItem';
import Modal from './Modal/Modal';
import TaskCreator from './taskCreator/taskCreator';
import WeatherWidget from './Weather/WeatherWidget';

import {
	lastUpdatedManager,
	tasksManager,
} from '../../todoLogic/AppDataManagers';
import DailyNotification from './DailyNotification/DailyNotification';
import { isPrivateContext } from '../../pages/todo/context/context';
import {
	selectDailyLastShown,
	selectDailyLastShownPrivate,
} from '../../todoStore/daily';

export default function Todo(
	{ offlineInstance = false } /* : {
	offlineInstance?: boolean;
} */
) {
	const isPrivate = useContext(isPrivateContext);
	const submit = useSubmit();
	const tasks = useAppSelector(isPrivate ? selectPrivateTasks : selectTasks);
	const lastUpdated = useAppSelector(
		isPrivate ? selectDailyLastShownPrivate : selectDailyLastShown
	);
	const dispatch = useAppDispatch();

	const location = useLocation();
	const q = location.search.slice(2);

	const [isOnline, setIsOnline] = useState(false);
	const [newTaskIsOpen, setNewTaskIsOpen] = useState(false);

	const notcompletedItems = tasks.filter((item) => !item.isCompleted);
	const completedItems = tasks.filter((item) => item.isCompleted);

	const handleNewTask = (task: Task) => {
		const tasksBeforeNew = tasks;
		dispatch(addTask({ task, isPrivate }));
		if (!isPrivate) {
			tasksManager.serverOps
				.addNewTask({ body: JSON.stringify(task) })
				.catch((err) => {
					//display 'no connection'
					dispatch(setAllTasks({ tasks: tasksBeforeNew, isPrivate }));
				});
		}
	};

	const handleCheckbox = (id: string) => {
		const tasksBeforeCheck = tasks;
		dispatch(checkTask({ id, isPrivate }));
		if (!isPrivate) {
			tasksManager.serverOps.deleteTaskById({ params: id }).catch((err) => {
				console.log(err);
				dispatch(setAllTasks({ tasks: tasksBeforeCheck, isPrivate }));
				alert('unable to update the server');
			});
		}
	};
	const handleRemove = (id: string) => {
		const tasksBeforeDelete = tasks;
		dispatch(deleteTask({ id, isPrivate }));
		if (!isPrivate) {
			tasksManager.serverOps.deleteTaskById({ params: id }).catch((err) => {
				console.log(err);
				dispatch(setAllTasks({ tasks: tasksBeforeDelete, isPrivate }));
				alert('unable to update the server');
			});
		}
	};

	const loadItems = async () => {
		console.log(tasksManager);
		if (!isPrivate) {
			dispatch(setAllTasks(await tasksManager.serverOps.getAllTasks()));
		}
	};
	useEffect(() => {
		if (!isPrivate) {
			loadItems();
		}
	}, []);

	return (
		<div className="main">
			<div className="title">
				<h1>To Do List</h1>
				{/* <WeatherWidget /> */}
			</div>
			<div className="search-bar">
				<Form className="search-form" id="search-form" role="search">
					<input
						id="q"
						aria-label="Search tasks"
						placeholder="Search Task"
						type="search"
						name="q"
						className="search-input"
						onChange={(e) => {
							const isFirstSearch = q === null;
							submit(e.currentTarget.form, { replace: !isFirstSearch });
						}}
					/>
				</Form>
				<button
					className="button search-button"
					onClick={() => setNewTaskIsOpen(true)}
				>
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
					/>
				))}
			</ul>
			<Outlet />
			{!offlineInstance && (
				<StatusIcon isOnline={isOnline} clickCallback={loadItems} />
			)}
			{newTaskIsOpen && (
				<Modal onClose={() => setNewTaskIsOpen(false)}>
					<h3>New Task</h3>
					<TaskCreator
						onCancel={() => setNewTaskIsOpen(false)}
						onAccept={handleNewTask}
					/>
				</Modal>
			)}
			<DailyNotification tasks={tasks} />
		</div>
	);
}

function StatusIcon({
	isOnline = false,
	clickCallback = () => console.log('click Notification'),
}) {
	const statusColor = isOnline ? 'green' : 'red';
	const text = `${isOnline ? 'Connected' : 'No connection'}`;

	return (
		<button
			className="notification"
			style={{ backgroundColor: statusColor }}
			onClick={clickCallback}
		>
			<p>{text}</p>
		</button>
	);
}

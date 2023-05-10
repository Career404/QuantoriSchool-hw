import { useEffect, useMemo, useState } from 'react';
import { Form, Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import { LoaderReturnType } from '../../pages/ToDo/loaders/todoLoader';
import { useAppDispatch, useAppSelector } from '../../todoStore/hooks';

import ListItem from './ListItem/ListItem';
import Modal from './Modal/Modal';
import TaskCreator from './taskCreator/taskCreator';
import DailyNotification from './DailyNotification/DailyNotification';
import WeatherWidget from './Weather/WeatherWidget';
import {
	addTask,
	checkTask,
	deleteTask,
	selectTasks,
} from '../../todoStore/tasks';

export default function Todo(
	{ offlineInstance = false } /* : {
	offlineInstance?: boolean;
} */
) {
	const taskStoreName = offlineInstance ? 'privateTasks' : 'tasks';
	const { q, url } = useLoaderData() as Awaited<ReturnType<LoaderReturnType>>;
	const tasks = useAppSelector((state) => selectTasks(taskStoreName)(state));
	const submit = useSubmit();
	const dispatch = useAppDispatch();
	useEffect(() => {
		(document.getElementById('q') as HTMLInputElement).value = q ?? '';
	}, [q]);

	const [isOnline, setIsOnline] = useState(false);
	const [newTaskIsOpen, setNewTaskIsOpen] = useState(false);

	const handleNewTask = (task: Task) => {
		const tasksBeforeNew = tasks;
		dispatch(addTask(taskStoreName)({ task }));
	};

	const handleCheckbox = (id: string) => {
		const tasksBeforeCheck = tasks;
		dispatch(checkTask(taskStoreName)({ id }));
	};
	const handleRemove = (id: string) => {
		const tasksBeforeDelete = tasks;
		dispatch(deleteTask(taskStoreName)({ id }));
	};

	/* 	const loadItems = async () => {
			dispatch(setAllTasks({ tasks, isPrivate }));
	};

	useEffect(() => {
		loadItems();
	}, []); */
	/*
	const filteredTasks = q
		? tasks.filter((item: Task) =>
				item.title.toLowerCase().includes(q.toLowerCase())
		  )
		: tasks; */

	const notcompletedItems = tasks.filter((item) => !item.isCompleted);

	const completedItems = tasks.filter((item) => item.isCompleted);

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
				<StatusIcon isOnline={isOnline} /* clickCallback={loadItems} */ />
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
			<DailyNotification tasks={tasks} isPrivate={offlineInstance} />
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

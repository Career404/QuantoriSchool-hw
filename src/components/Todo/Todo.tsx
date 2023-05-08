import { useState, useEffect } from 'react';
import useLocalStorage from '../../utility/localStorage/useLocalstorage';
import { getTimeOfDay } from '../../utility/helpers';

import ListItem from './ListItem/ListItem';
import Modal from './Modal/Modal';
import TaskCreator from './taskCreator/taskCreator';
import WeatherWidget from './Weather/WeatherWidget';

import { Form, Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import { TodoLoader } from './TodoLoader';
import { useAppDispatch, useAppSelector } from '../../todoStore/hooks';
import { checkTask, deleteTask, selectTasks } from '../../todoStore/tasks';
import {
	selectDailyLastShown,
	updateDailyLastShown,
} from '../../todoStore/daily';

export default function Todo(
	{ offlineInstance = false } /* : {
	offlineInstance?: boolean;
} */
) {
	const submit = useSubmit();
	const { q, id } = useLoaderData() as Awaited<ReturnType<TodoLoader>>;
	const { tasks } = useAppSelector(selectTasks);
	//! remove this V line
	const items = tasks;
	const dispatch = useAppDispatch();
	const [lastUpdated, setLastUpdated] = useLocalStorage(`${id}-lastUpdated`, 0);
	const [isOnline, setIsOnline] = useState(false);
	const [newTaskIsOpen, setNewTaskIsOpen] = useState(false);
	const showDailyDate = useAppSelector(selectDailyLastShown);

	//!extract daily stuff
	/*
	const [showDailyDate, setShowDailyDate] = useLocalStorage(
		`${id}-dailyNotificationLastShown`,
		0
	); */
	useEffect(() => {
		if (!offlineInstance) {
			loadItems();
		}
	}, [offlineInstance, id]);

	useEffect(() => {
		(document.getElementById('q') as HTMLInputElement).value = q ?? '';
	}, [q]);

	const ONE_DAY_IN_MS = 8.64e7;
	const today = new Date();
	const todaysTasks = items.filter(
		(item) =>
			new Date(item.dateDueJson).toLocaleDateString() ===
				today.toLocaleDateString() && !item.isCompleted
	);
	const showDaily =
		Number(showDailyDate) <= Date.now() - ONE_DAY_IN_MS &&
		todaysTasks.length > 0;
	const handleCloseDaily = {
		closeDaily: () => dispatch(updateDailyLastShown(Date.now().toString())),
		showDailyNow: () =>
			dispatch(updateDailyLastShown((Date.now() - ONE_DAY_IN_MS).toString())),
	};

	const loadItems = () => {
		console.log('loadItems');
	};

	const notcompletedItems = items.filter((item) => !item.isCompleted);
	const completedItems = items.filter((item) => item.isCompleted);

	const handleCheckbox = (id: string) => {
		dispatch(checkTask(id));
	};
	const handleRemove = (id: string) => {
		dispatch(deleteTask(id));
	};

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
						defaultValue={q?.toString()}
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
			<h2
				title="Click me to see today's tasks"
				onClick={handleCloseDaily.showDailyNow}
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.code === 'Space' || e.key === 'Enter') {
						handleCloseDaily.showDailyNow;
					}
				}}
			>
				All Tasks
			</h2>
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
					<TaskCreator onCancel={() => setNewTaskIsOpen(false)} />
				</Modal>
			)}
			{showDaily ? (
				<Modal onClose={handleCloseDaily.closeDaily}>
					<div>
						<h3>Good {getTimeOfDay(today)}</h3>
						<div className="todaysTasks">
							<p>You have the next planned tasks for today: </p>{' '}
							<ul>
								{todaysTasks.map((task) => (
									<li key={'todaysTasks' + task.id}>{task.title}</li>
								))}
							</ul>
						</div>
					</div>
					<div className="buttons-container">
						<button
							className="button agree-button"
							onClick={handleCloseDaily.closeDaily}
						>
							Ok
						</button>
					</div>
				</Modal>
			) : null}
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

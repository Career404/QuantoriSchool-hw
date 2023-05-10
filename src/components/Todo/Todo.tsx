import { useEffect, useMemo, useState } from 'react';
import { Form, useLoaderData, useSubmit } from 'react-router-dom';
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
	editTask,
	selectTasks,
} from '../../todoStore/tasks';
import { useNavigate, useParams } from 'react-router';
import TagSelector, { AvailableTags } from './TagSelector/TagSelector';
import { useLocation } from 'react-router';

export default function Todo({ offlineInstance = false }) {
	const taskStoreName = offlineInstance ? 'privateTasks' : 'tasks';
	const tasks = useAppSelector((state) => selectTasks(taskStoreName)(state));
	const submit = useSubmit();
	const dispatch = useAppDispatch();

	const { q, url } = useLoaderData() as Awaited<ReturnType<LoaderReturnType>>;
	const params = useParams();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		(document.getElementById('q') as HTMLInputElement).value = q ?? '';
	}, [q]);

	const [isOnline, setIsOnline] = useState(false);
	const [newTaskIsOpen, setNewTaskIsOpen] = useState(false);
	const [editTaskIsOpen, setEditTaskIsOpen] = useState(false);
	const [selectedForEdit, setSelectedForEdit] = useState(
		undefined as Task | undefined
	);

	const handleTagSelect = (tag: AvailableTags | undefined) =>
		/* navigate(
			(offlineInstance ? '/private/' : '/server/') +
				(tag ? tag : '') +
				(q ? '?q=' + q : ' ')
		); */
		//To my eye both of these are understandable, which one should I actually write?
		{
			const baseRoute = offlineInstance ? '/private/' : '/server/';
			const tagParam = tag ? tag : '';
			const queryParam = q ? '?q=' + q : '';
			navigate(baseRoute + tagParam + queryParam);
		};

	const handleNewTask = (
		task: Task = {
			id: '',
			title: '',
			tag: '',
			isCompleted: false,
			dateDueJson: Date.now().toString(),
		}
	) => {
		//const tasksBeforeNew = tasks;
		dispatch(addTask(taskStoreName)({ task }));
	};

	const handleCheckbox = (id: string) => {
		//const tasksBeforeCheck = tasks;
		dispatch(checkTask(taskStoreName)({ id }));
	};
	const handleRemove = (id: string) => {
		//const tasksBeforeDelete = tasks;
		dispatch(deleteTask(taskStoreName)({ id }));
	};

	const handleClickEdit = (task: Task) => {
		setSelectedForEdit(task);
		console.log(selectedForEdit);
		setEditTaskIsOpen(true);
	};

	const handleEditTask = (editedTask: Task) => {
		console.log('handleEdit', editedTask);
		dispatch(editTask(taskStoreName)({ task: editedTask }));
	};

	/* 	const loadItems = async () => {
			dispatch(setAllTasks({ tasks, isPrivate }));
	};

	useEffect(() => {
		loadItems();
	}, []); */

	const tagFilteredItems = useMemo(() => {
		return params.tag ? tasks.filter((item) => item.tag === params.tag) : tasks;
	}, [params.tag, tasks]);
	const searchedItems = useMemo(() => {
		return q
			? tagFilteredItems.filter((item) => item.title.includes(q))
			: tagFilteredItems;
	}, [q, tagFilteredItems]);
	const notcompletedItems = useMemo(() => {
		return searchedItems.filter((item) => !item.isCompleted);
	}, [searchedItems]);
	const completedItems = useMemo(() => {
		return searchedItems.filter((item) => item.isCompleted);
	}, [searchedItems]);

	return (
		<div className="main">
			<div className="title">
				<h1>To Do List</h1>
				<WeatherWidget />
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
			<TagSelector
				onTagSelect={handleTagSelect}
				supportDeselect
				defaultTag={(params.tag as AvailableTags) || undefined}
			/>
			<h2>All Tasks</h2>
			<ul>
				{notcompletedItems.map((item) => (
					<ListItem
						key={item.id}
						item={item}
						clickCheckbox={handleCheckbox}
						clickRemove={handleRemove}
						clickEdit={() => handleClickEdit(item)}
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
			{editTaskIsOpen && (
				<Modal onClose={() => setEditTaskIsOpen(false)}>
					<h3>Edit Task</h3>
					<TaskCreator
						onCancel={() => setEditTaskIsOpen(false)}
						onAccept={handleEditTask}
						editTask={selectedForEdit}
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

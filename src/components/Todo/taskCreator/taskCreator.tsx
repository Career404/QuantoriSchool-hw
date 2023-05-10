import { useState } from 'react';
import TagSelector, { AvailableTags } from '../TagSelector/TagSelector';

import './TaskCreator.css';

interface TaskCreatorProps {
	onCancel: () => void;
	onAccept: (task?: Task) => void;
	editTask?: Task;
}

export default function TaskCreator({
	onCancel = () => {
		console.log('No close behaviour specified');
	},
	onAccept = () => {
		console.log('No accept behaviour specified');
	},
	editTask,
}: TaskCreatorProps) {
	const [newTaskTitle, setNewTaskTitle] = useState(editTask?.title || '');
	const [taskDate, setTaskDate] = useState(
		editTask?.dateDueJson.slice(0, 10) || new Date().toJSON().slice(0, 10)
	);

	const [selectedTag, setSelectedTag] = useState(
		(editTask?.tag as AvailableTags) ?? 'health'
	);

	const tagClickHandler = (tag: AvailableTags) => {
		setSelectedTag(tag);
	};

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
					value={newTaskTitle}
					onChange={(e) => {
						setNewTaskTitle(e.target.value);
					}}
				/>
				<div className="newTask-more">
					<TagSelector
						onTagSelect={(tag) => tagClickHandler(tag!)}
						defaultTag={selectedTag}
					/>
					<input
						type="date"
						className="datePicker"
						defaultValue={taskDate}
						onChange={(e) => {
							setTaskDate(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className="buttons-container">
				<button className="button cancel-button" onClick={onCancel}>
					Cancel
				</button>
				<button
					className="button agree-button"
					onClick={() => {
						const newTask = {
							title: newTaskTitle,
							isCompleted: false,
							dateDueJson: new Date(taskDate).toJSON(),
							tag: selectedTag,
							id: new Date().getTime().toString(),
						};
						console.log(newTask);
						onAccept(newTask);
						onCancel();
					}}
					disabled={!Boolean(newTaskTitle)}
				>
					{editTask ? 'Save changes' : 'Add Task'}
				</button>
			</div>
		</>
	);
}

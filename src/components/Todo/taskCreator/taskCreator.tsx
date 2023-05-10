import { useState } from 'react';
import TagSelector, { AvailableTags } from '../TagSelector/TagSelector';

import './TaskCreator.css';

export default function TaskCreator({
	onCancel = () => {
		console.log('No close behaviour specified');
	},
	onAccept = (placeholder?: any) => {
		console.log('No accept behaviour specified');
	},
}) {
	const [newTaskTitle, setNewTaskTitle] = useState('');

	let selectedTag: AvailableTags = 'health';
	let selectedDate: string = new Date().toJSON().slice(0, 10);

	const tagClickHandler = (tag: AvailableTags) => {
		selectedTag = tag;
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
					onChange={(e) => {
						setNewTaskTitle(e.target.value);
					}}
				/>
				<div className="newTask-more">
					<TagSelector
						onTagSelect={(tag) => tagClickHandler(tag!)}
						defaultTag="health"
					/>
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
				<button className="button cancel-button" onClick={onCancel}>
					Cancel
				</button>
				<button
					className="button agree-button"
					onClick={() => {
						onAccept({
							title: newTaskTitle,
							isCompleted: false,
							dateDueJson: new Date(selectedDate).toJSON(),
							tag: selectedTag,
							id: new Date().getTime().toString(),
						});
						onCancel();
					}}
					disabled={!Boolean(newTaskTitle)}
				>
					Add Task
				</button>
			</div>
		</>
	);
}

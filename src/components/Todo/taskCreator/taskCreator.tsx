import { useState } from 'react';

export default function TaskCreator({
	onCancel = () => {
		console.log('No close behaviour specified');
	},
	onAccept = (placeholder?: any) => {
		console.log('No accept behaviour specified');
	},
}) {
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
					disabled={!!!newTaskTitle}
				>
					Add Task
				</button>
			</div>
		</>
	);
}

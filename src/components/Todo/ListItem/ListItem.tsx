import { formatDate } from '../../../utility/helpers';

import './ListItem.css';

interface ListItemProps {
	item: Task;
	clickCheckbox: Function;
	clickRemove?: Function;
	clickEdit?: () => void;
}

export default function ListItem({
	item,
	clickCheckbox,
	clickRemove,
	clickEdit,
}: ListItemProps) {
	const props = { item, clickCheckbox, clickRemove };
	return (
		<li className="list-item">
			<label className="label">
				<input
					type="checkbox"
					name={`is${item.id}Completed`}
					id={`is${item.id}Completed`}
					checked={item.isCompleted}
					onChange={() => clickCheckbox(item.id)}
				/>
				<div className="item-info">
					<p>{item.title}</p>
					<div className="li-more">
						<div className={`li-tag li-tag-${item.tag}`}>{item.tag}</div>
						<div className="li-date">{formatDate(item.dateDueJson)}</div>
					</div>
				</div>
			</label>
			{clickEdit ? (
				<div
					className="icon-interactive"
					tabIndex={0}
					onClick={clickEdit}
					onKeyDown={(e) => {
						if (e.code === 'Space' || e.key === 'Enter') {
							clickEdit();
						}
					}}
				>
					Edit Task
				</div>
			) : null}
			{clickRemove ? (
				<div
					className="delete-icon icon-interactive"
					tabIndex={0}
					onClick={() => clickRemove(item.id)}
					onKeyDown={(e) => {
						if (e.code === 'Space' || e.key === 'Enter') {
							clickRemove(item.id);
						}
					}}
				></div>
			) : null}
		</li>
	);
}

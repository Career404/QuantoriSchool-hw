//import Icon from '../Icon/Icon';
import { formatDate } from '../../../utility/helpers';

import './ListItem.css';

interface ListItemProps extends Props {
	item: Task;
	clickCheckbox: Function;
	removeItem?: Function;
}

export default function ListItem({
	item,
	clickCheckbox,
	removeItem,
}: ListItemProps) {
	return (
		<li className="list-item">
			<label className="label">
				<input
					type="checkbox"
					name={`is${item.id}Completed`}
					id={`is${item.id}Completed`}
					checked={item.isCompleted}
					onChange={() => clickCheckbox()}
				/>
				<div className="item-info">
					<p>{item.title}</p>
					<div className="li-more">
						<div className={`li-tag li-tag-${item.tag}`}>{item.tag}</div>
						<div className="li-date">{formatDate(item.dateDueJson)}</div>
					</div>
				</div>
			</label>
			{removeItem ? (
				<div
					className="delete-icon icon-interactive"
					tabIndex={0}
					onClick={() => removeItem(item.id)}
					onKeyDown={(e) => {
						if (e.code === 'Space' || e.key === 'Enter') {
							removeItem(item.id);
						}
					}}
				></div>
			) : null}
		</li>
	);
}

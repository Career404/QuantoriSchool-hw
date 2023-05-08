import { useContext } from 'react';
import { isPrivateContext } from '../../../pages/todo/context/context';
import {
	selectDailyLastShown,
	selectDailyLastShownPrivate,
	updateDailyLastShown,
} from '../../../todoStore/daily';
import { useAppDispatch, useAppSelector } from '../../../todoStore/hooks';
import { getTimeOfDay } from '../../../utility/helpers';
import Modal from '../Modal/Modal';

import './DailyNotification.css';

export default function DailyNotification({ tasks }: { tasks: Task[] }) {
	const isPrivate = useContext(isPrivateContext);
	const showDailyDate = useAppSelector(
		isPrivate ? selectDailyLastShownPrivate : selectDailyLastShown
	);
	const dispatch = useAppDispatch();

	const ONE_DAY_IN_MS = 8.64e7;
	const today = new Date();
	const todaysTasks = tasks.filter(
		(task) =>
			new Date(task.dateDueJson).toLocaleDateString() ===
				today.toLocaleDateString() && !task.isCompleted
	);
	const showDaily =
		Number(showDailyDate) <= Date.now() - ONE_DAY_IN_MS &&
		todaysTasks.length > 0;

	const closeDaily = () =>
		dispatch(
			updateDailyLastShown({ lastShown: Date.now().toString(), isPrivate })
		);
	const showDailyNow = () =>
		dispatch(
			updateDailyLastShown({
				lastShown: (Date.now() - ONE_DAY_IN_MS).toString(),
				isPrivate,
			})
		);

	return (
		<>
			<div className="daily-overlay" onClick={showDailyNow}>
				click to show todays tasks
			</div>
			{showDaily && (
				<Modal onClose={closeDaily}>
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
						<button className="button agree-button" onClick={closeDaily}>
							Ok
						</button>
					</div>
				</Modal>
			)}
		</>
	);
}

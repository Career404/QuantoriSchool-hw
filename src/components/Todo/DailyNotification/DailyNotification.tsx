import {
	selectDailyLastShown,
	selectDailyLastShownPrivate,
	updateDailyLastShown,
} from '../../../todoStore/daily';
import { useAppDispatch, useAppSelector } from '../../../todoStore/hooks';
import { getTimeOfDay } from '../../../utility/helpers';
import Modal from '../Modal/Modal';

import './DailyNotification.css';

export default function DailyNotification({
	tasks,
	isPrivate = true,
}: {
	tasks: Task[];
	isPrivate?: boolean;
}) {
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

	const closeDaily = () => {
		dispatch(updateDailyLastShown({ lastShown: Date.now(), isPrivate }));
	};

	//this function has no business setting localStorage only to immediately reset it again (from a user perspective, it seems useless)
	const showDailyNow = () => {
		const dateToShowNow = Date.now() - ONE_DAY_IN_MS;
		dispatch(
			updateDailyLastShown({
				lastShown: dateToShowNow,
				isPrivate,
			})
		);
	};

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

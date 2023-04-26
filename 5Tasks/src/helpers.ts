export function childrenIsArray(
	children: string | HTMLElement | (string | HTMLElement)[]
): children is (string | HTMLElement)[] {
	return Array.isArray(children);
}

export function childrenArray(
	children?: string | HTMLElement | Array<HTMLElement | string>
): Array<HTMLElement | string> {
	if (Array.isArray(children)) {
		return children;
	} else if (children) {
		return [children];
	} else {
		return [];
	}
}

export function formatDate(date: string | number | Date) {
	date = new Date(date);
	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	if (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	) {
		return 'Today';
	} else if (
		date.getDate() === tomorrow.getDate() &&
		date.getMonth() === tomorrow.getMonth() &&
		date.getFullYear() === tomorrow.getFullYear()
	) {
		return 'Tomorrow';
	} else if (
		date.getDate() === yesterday.getDate() &&
		date.getMonth() === yesterday.getMonth() &&
		date.getFullYear() === yesterday.getFullYear()
	) {
		return 'Yesterday';
	} else {
		const daysOfWeek = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];
		const dayOfWeek = daysOfWeek[date.getDay()];
		const dayOfMonth = date.getDate();
		const monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];
		const monthName = monthNames[date.getMonth()];
		return `${dayOfWeek}, ${dayOfMonth} ${monthName}`;
	}
}
export function getTimeOfDay(date: Date) {
	const hour = date.getHours();
	if (hour >= 5 && hour < 12) {
		return 'morning';
	} else if (hour >= 12 && hour < 18) {
		return 'day';
	} else if (hour >= 18 && hour < 22) {
		return 'evening';
	} else {
		return 'night';
	}
}

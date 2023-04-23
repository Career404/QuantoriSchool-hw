import { setStorage, getStorage } from '../localStorage/localstorage.js';

export default function checkDaily(showDailyCallback) {
	const dailySettings = getStorage('dailySettings');
	const dailyNotification = getStorage('dailyNotificationLastShown');
	if (dailyNotification) {
		const ONE_DAY_IN_MS = 8.64e7;
		if (dailyNotification >= Date.now() + ONE_DAY_IN_MS) {
			showDailyCallback();
			setStorage('dailyNotificationLastShown', Date.now());
		}
	} else {
		showDailyCallback();
		setStorage('dailyNotificationLastShown', Date.now());
	}
}

const dailySettings = {
	showModal: true,
	time: [12, 23],
};

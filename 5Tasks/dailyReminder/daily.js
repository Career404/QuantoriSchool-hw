import { setStorage, getStorage } from '../localStorage/localstorage.js';

export default function checkDaily(showDailyCallback) {
	const dailyNotification = getStorage('dailyNotificationLastShown');
	if (dailyNotification) {
		if (dailyNotification >= Date.now() + 8.64e7) {
			showDailyCallback();
			setStorage('dailyNotificationLastShown', Date.now());
		}
	} else {
		showDailyCallback();
		setStorage('dailyNotificationLastShown', Date.now());
	}
}

export default function getAuth() {
	let auth = localStorage.getItem('instanceId');
	if (!auth) {
		auth = Date.now().toString();
		localStorage.setItem('instanceId', auth);
	}
	return auth;
}
export const AUTH = getAuth();

export const GENERIC_USER_ID = 'genericUserId';
/*
this is not under localStorage folder because it might be remade into a real auth mechanism later
*/

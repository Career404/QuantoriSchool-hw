export default function getAuth() {
	let auth = localStorage.getItem('instanceId');
	if (!auth) {
		auth = Date.now().toString();
		localStorage.setItem('instanceId', auth);
	}
	return auth;
}

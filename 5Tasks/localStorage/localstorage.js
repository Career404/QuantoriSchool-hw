export const setStorage = (name = new Date().getTime().toString(), state) =>
	localStorage.setItem(name, JSON.stringify(state));
export const getStorage = (name) =>
	localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : false;

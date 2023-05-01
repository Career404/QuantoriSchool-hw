export const setStorage = (name: string, state: any) =>
	localStorage.setItem(name, JSON.stringify(state));

export const getStorage = (name: string) =>
	JSON.parse(localStorage.getItem(name)!);

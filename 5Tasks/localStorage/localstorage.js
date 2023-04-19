/**

Set the state into the local storage.
@param {string} name - The name of the storage.
@param {object} state - The object containing the state.
*/
export const setStorage = (name, state) =>
	localStorage.setItem(name, JSON.stringify(state));

/**

Get the state from the local storage.
@param {string} name - The name of the storage.
@returns {object|boolean} - The state object if it exists, otherwise false.
*/
export const getStorage = (name) =>
	localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : false;

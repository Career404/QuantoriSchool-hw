import { setStorage, getStorage } from '../localStorage/localstorage.js';
import { formatDate } from '../helpers.js';

import '../oop/components/Icon/Icon.css';
import '../oop/components/List/List.css';
import '../oop/components/Modal/Modal.css';
import '../oop/components/Weather/WeatherWidget.css';
import '../oop/app.css';
//this could be done with a separate functional.css, would be cleaner. Maybe this file and functional/oop tabs should be fully dropped from the project.

export default function funcApp() {
	const state = {};
	/**
	 * Global application state
	 * @template T
	 * @param name {string}
	 * @param {T} initialValue
	 * @returns {[T, function(T): void]}
	 */
	function useState(name, initialValue) {
		state[name] = state[name] || initialValue;
		const setValue = (newValue) => {
			state[name] = newValue;
			renderApp();
		};
		setStorage('funcState', state);
		return [state[name], setValue];
	}

	/**
	 * Title component
	 * @param text {string}
	 * @param size {number}
	 * @returns {HTMLHeadingElement} - Heading element
	 */
	function Title({ text, size }) {
		const title = document.createElement(`h${size}`);
		title.innerHTML = text;
		return title;
	}

	/**
	 * InputText component
	 * @param placeholder {string}
	 * @param text {string}
	 * @returns {HTMLInputElement} - Input element
	 */
	function InputText({ placeholder, text = '' }) {
		const InputText = document.createElement('input');
		InputText.type = 'text';
		InputText.placeholder = placeholder;
		InputText.value = text;
		return InputText;
	}

	/**
	 * Icon component
	 * @param icon {'delete'}
	 * @param text {string}
	 * @param onClick {Function}
	 * @param callbackParam {any}
	 * @returns {HTMLDivElement} - Div element
	 */
	function Icon(icon, text, onClick, callbackParam) {
		const iconEl = document.createElement('div');
		iconEl.classList.add(`${icon}-icon`);
		if (text) {
			iconEl.innerText = text;
		}
		if (onClick) {
			iconEl.classList.add('icon-interactive');
			iconEl.tabIndex = 0;
			iconEl.onclick = () => {
				//? prop drilled for removeItem, but is there a way around it?
				callbackParam ? onClick(callbackParam) : onClick();
			};
			iconEl.onkeydown = (e) => {
				if (e.code === 'Space' || e.key === 'Enter') {
					callbackParam ? onClick(callbackParam) : onClick();
				}
			};
		}
		return iconEl;
	}

	/**
	 * Button component
	 * @param text {string}
	 * @param onClick {function}
	 * @returns {HTMLButtonElement} - Button element
	 */
	function Button(text, onClick) {
		const button = document.createElement('button');
		button.classList.add('button');
		button.innerHTML = text;
		button.onclick = onClick;
		return button;
	}

	/**
	 * Functional component for the list
	 * @param items {{title: String, isCompleted: Boolean, id: String}[]}
	 * @param searchRequest {string}
	 * @param deleteCallback {Function}
	 * @returns {HTMLElement} - List element
	 */
	function List(
		{
			items = [
				{ title: 'Oops! Items are empty', isCompleted: false, id: 'default' },
			],
		},
		searchRequest = '',
		checkCallback,
		deleteCallback
	) {
		const listItems = items
			.filter((item) => item.title.toLowerCase().includes(searchRequest))
			.map((item) => {
				const listItemDiv = document.createElement('div');
				listItemDiv.classList.add('list-item');
				const checkbox = document.createElement('input');
				checkbox.type = 'checkbox';
				checkbox.id = `is${item.id}Completed`;
				checkbox.checked = item.isCompleted;
				checkbox.addEventListener('change', () => checkCallback(item.id));
				const label = document.createElement('label');
				label.htmlFor = checkbox.id;
				label.classList.add('label');
				const liEl = document.createElement('li');
				liEl.classList.add('item-info');
				const text = document.createElement('p');
				text.textContent = item.title;
				const liMore = document.createElement('div');
				liMore.classList.add('li-more');
				const liTag = document.createElement('div');
				liTag.classList.add('li-tag', `li-tag-${item.tag}`);
				liTag.innerText = item.tag;
				const liDate = document.createElement('div');
				liDate.classList.add('li-date');
				liDate.innerText = formatDate(item.dateDueJson);
				liMore.append(liTag, liDate);
				liEl.append(text, liMore);
				label.append(checkbox, liEl);
				listItemDiv.append(label, Icon('delete', '', deleteCallback, item));
				return listItemDiv;
			});
		const ul = document.createElement('ul');
		listItems.forEach((listItem) => {
			ul.append(listItem);
		});
		return ul;
	}

	/**
	 * Modal component
	 * @param title {string} - Modal title (h3)
	 * @param [...children] {HTMLElement[]} - HTML elements array with contents of the
	 * @param agreeText {string} - Modal has "Cancel" and "Continue" buttons by default. This will be used instead of "Continue"
	 * @param agreeCallback {Function}
	 * @param agreeCallbackParam {{tag: string, [key: string]: any}}
	 * @returns {HTMLDivElement} - Heading element
	 */
	function Modal(
		title,
		[...children] = [],
		agreeText = 'Continue',
		agreeCallback = null,
		agreeCallbackParam = [null]
	) {
		const fullscreen = document.createElement('div');
		fullscreen.classList.add('fullscreen');
		document.getElementById('functional-example').append(fullscreen);
		fullscreen.addEventListener('click', () => fullscreen.remove());
		const modal = document.createElement('form');
		modal.classList.add('modal');
		modal.name = 'newTask';
		fullscreen.append(modal);
		modal.addEventListener('click', (e) => e.stopPropagation());
		//? might as well leave the title to be in [...children]
		const header = document.createElement('h3');
		header.innerText = title;
		const buttonsContainer = document.createElement('div');
		buttonsContainer.classList.add('buttons-container');
		const cancelButton = Button('Cancel', () => fullscreen.remove());
		cancelButton.type = 'button';
		cancelButton.classList.add('cancel-button');
		let agreeButton;
		if (agreeCallbackParam && agreeCallbackParam.tag === 'addTask') {
			agreeButton = Button(agreeText, () => {
				agreeCallbackParam
					? agreeCallback(
							agreeCallbackParam.input.value,
							agreeCallbackParam.selectedTag,
							agreeCallbackParam.dateInput.value
					  )
					: agreeCallback();
			});
			agreeButton.disabled = true;
			agreeCallbackParam.input.addEventListener('input', () =>
				agreeCallbackParam.input.value.length < 1
					? (agreeButton.disabled = true)
					: (agreeButton.disabled = false)
			);
		} else {
			agreeButton = Button(agreeText, () => {
				agreeCallbackParam
					? agreeCallback(agreeCallbackParam)
					: agreeCallback();
			});
		}
		agreeButton.type = 'submit';
		agreeButton.classList.add('agree-button');

		buttonsContainer.append(cancelButton, agreeButton);
		modal.append(header, ...children, buttonsContainer);
		if (agreeCallbackParam && agreeCallbackParam.tag === 'addTask') {
			fullscreen.querySelector('input').focus();
		}
	}

	/**
	 * App container
	 * @returns {HTMLDivElement} - The app container
	 */
	function App() {
		const stateStore = getStorage('funcState');
		let items,
			setItems,
			searchRequest,
			setSearchRequest,
			isFocused,
			setIsFocused;
		if (!stateStore) {
			console.log('no storage');
			const today = new Date();
			[items, setItems] = useState('items', [
				{
					title: 'Tasks in this tab only exist on this device',
					isCompleted: false,
					dateDueJson: today.toJSON(),
					tag: 'home',
					id: Date.now() + '1',
				},
			]);

			[searchRequest, setSearchRequest] = useState('search', '');
			[isFocused, setIsFocused] = useState('inputFocus', false);
		} else {
			[items, setItems] = useState('items', stateStore.items);

			[searchRequest, setSearchRequest] = useState(
				'search',
				stateStore.searchRequest
			);
			[isFocused, setIsFocused] = useState('inputFocus', stateStore.isFocused);
		}

		const notcompletedItems = items.filter((item) => item.isCompleted !== true);
		const completedItems = items.filter((item) => item.isCompleted === true);

		function addItem() {
			const availableTags = ['health', 'work', 'home', 'other'];
			let selectedTag = 'health';

			const taskCreator = document.createElement('div');
			taskCreator.classList.add('taskCreator');
			const input = document.createElement('input');
			input.classList.add('newTaskTitle');
			input.type = 'text';
			input.minLength = '1';
			input.name = 'taskTitle';
			input.id = 'taskTitle';
			input.placeholder = 'Task Title';

			const dateInput = document.createElement('input');
			dateInput.type = 'date';
			dateInput.value = new Date().toJSON().slice(0, 10);
			dateInput.classList.add('datePicker');

			const selectTags = availableTags.map((tag, index) => {
				let checkFirst = index === 0 ? true : false;
				const radio = document.createElement('input');
				radio.type = 'radio';
				radio.name = 'tag';
				radio.id = tag;
				radio.checked = checkFirst;
				radio.classList.add('radioTab');
				const label = document.createElement('label');
				label.name = 'tag';
				label.classList.add('li-tag', 'newTaskTag', `li-tag-${tag}`);
				label.tabIndex = 0;
				label.innerText = tag;
				label.append(radio);
				label.onclick = () => (selectedTag = tag);
				return label;
			});
			const newTaskData = document.createElement('div');
			newTaskData.classList.add('newTask-more');
			const tagSelector = document.createElement('div');
			tagSelector.classList.add('tagSelector');
			tagSelector.append(...selectTags);
			newTaskData.append(tagSelector, dateInput);
			taskCreator.append(input, newTaskData);

			Modal(
				'New Task',
				[taskCreator],
				'Add Task',
				(newTitle, newTag, newDateJson) =>
					setItems([
						...items,
						{
							title: newTitle.toString(),
							isCompleted: false,
							tag: newTag,
							dateDueJson: newDateJson,
							id: Date.now(),
						},
					]),
				{ tag: 'addTask', input, dateInput, selectedTag }
			);
		}

		function removeItem(removedItem) {
			setItems(items.filter((item) => item.id !== removedItem.id));
		}
		function clickCheckbox(id) {
			setItems(
				items.map((item) =>
					item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
				)
			);
		}

		const div = document.createElement('div');
		div.classList.add('main');
		const appTitle = Title({ text: 'To Do List', size: '1' });
		const search = InputText({
			placeholder: 'Search Task',
			text: searchRequest,
		});
		const allTitle = Title({ text: 'All Tasks', size: '2' });

		const list = List(
			{ items: notcompletedItems },
			searchRequest,
			clickCheckbox,
			removeItem
		);

		const button = Button('+ New Task', addItem);
		const completedTitle = Title({ text: 'Completed Tasks', size: '2' });
		const completedList = List(
			{ items: completedItems },
			searchRequest,
			clickCheckbox,
			removeItem
		);
		completedList.classList.add('completed-list');

		search.addEventListener('input', () => {
			setSearchRequest(search.value.toString());
			setIsFocused(true);
		});
		search.addEventListener('blur', () => {
			state.inputFocus = false;
		});

		const flexDiv = document.createElement('div');
		flexDiv.classList.add('search-bar');
		flexDiv.append(search, button);
		div.append(
			appTitle,
			flexDiv,
			allTitle,
			list,
			completedTitle,
			completedList
		);
		return div;
	}

	/**
	 * Render the app.
	 * On change whole app is re-rendered.
	 */
	function renderApp() {
		//
		// console.log('state:', state);
		//
		const appContainer =
			document.getElementById('functional-example') ||
			document.createElement('div');
		appContainer.innerHTML = '';
		appContainer.append(App());
		//* since this renders the entire app, there's no way to track focus other than here (cleaner with virtual DOM and independently rendered components)
		if (state.inputFocus === true) {
			const search = document
				.getElementsByClassName('search-bar')[0]
				.querySelector('input[type="text"]');
			search.focus();
		}
	}

	// initial render
	renderApp();
}

const funcMain = (function () {
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
	 * @param hasFocus {bool}
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
				//! prop drilled for removeItem, but is there a way around it?
				callbackParam ? onClick(callbackParam) : onClick();
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
				label.classList.add('completed-label');
				const liEl = document.createElement('li');
				liEl.textContent = item.title;
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
		agreeCallbackParam
	) {
		//? might as well leave the title to be in [...children]
		const fullscreen = document.createElement('dialog');
		fullscreen.classList.add('fullscreen');
		document.getElementById('functional-example').append(fullscreen);
		fullscreen.addEventListener('click', () => fullscreen.remove());
		const modal = document.createElement('div');
		modal.classList.add('modal');
		fullscreen.append(modal);
		modal.addEventListener('click', (e) => e.stopPropagation());
		const header = document.createElement('h3');
		header.innerText = title;
		const buttonsContainer = document.createElement('div');
		buttonsContainer.classList.add('buttons-container');

		const cancelButton = Button('Cancel', () => fullscreen.remove());
		cancelButton.classList.add('cancel-button');
		let agreeButton;
		if (agreeCallbackParam.tag === 'addTask') {
			agreeButton = Button(agreeText, () => {
				agreeCallbackParam
					? agreeCallback(agreeCallbackParam.input.value)
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
		agreeButton.classList.add('agree-button');
		buttonsContainer.append(cancelButton, agreeButton);
		modal.append(header, ...children, buttonsContainer);
		fullscreen.querySelector('input').focus();
	}

	/**
	 * App container
	 * @returns {HTMLDivElement} - The app container
	 */
	function App() {
		const [items, setItems] = useState('items', [
			{
				title: '1 I am 1',
				isCompleted: false,
				id: new Date().getTime() + '1',
			},
			{
				title: '2 number 2',
				isCompleted: true,
				id: new Date().getTime() + '2',
			},
			{
				title: '3 is 3',
				isCompleted: false,
				id: new Date().getTime() + '3',
			},
		]);

		const [searchRequest, setSearchRequest] = useState('search', '');
		const [isFocused, setIsFocused] = useState('inputFocus', false);
		const [searchSelection, setSearchSelection] = useState(
			'searchSelection',
			[0, 0]
		);

		const notcompletedItems = items.filter((item) => item.isCompleted !== true);
		const completedItems = items.filter((item) => item.isCompleted === true);

		function addItem() {
			const taskCreator = document.createElement('div');
			taskCreator.classList.add('taskCreator');
			const input = document.createElement('input');
			input.classList.add('newTaskTitle');
			input.type = 'text';
			input.minLength = '1';
			input.name = 'taskTitle';
			input.id = 'taskTitle';
			input.placeholder = 'Task Title';
			taskCreator.appendChild(input);

			Modal(
				'New Task',
				[taskCreator],
				'Add Task',
				(newTitle) =>
					setItems([
						...items,
						{
							title: newTitle.toString(),
							isCompleted: false,
							id: new Date().getTime(),
						},
					]),
				{ tag: 'addTask', input }
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
			setSearchSelection([search.selectionStart, search.selectionEnd]);
			setIsFocused(true);
		});
		search.addEventListener('blur', () => setIsFocused(false));
		//! this is terrible for keyboard navigation because focus causes re-renders
		search.tabIndex = -1;
		document.addEventListener('keydown', (e) => {
			//shift is easy to notice (but not optimal still)
			if (e.shiftKey) {
				search.focus();
			}
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
		console.log(state);
		//
		const appContainer =
			document.getElementById('functional-example') ||
			document.createElement('div');
		appContainer.innerHTML = '';
		appContainer.append(App());
		//* since this renders the entire app, there's no way to track focus other than here (React does it with virtual DOM and independently rendered components)
		if (state.inputFocus === true) {
			const search = document
				.getElementsByClassName('search-bar')[0]
				.querySelector('input[type="text"]');
			search.setSelectionRange(
				state.searchSelection[0],
				state.searchSelection[1]
			);
			search.focus();
		}
	}

	// initial render
	renderApp();
})();

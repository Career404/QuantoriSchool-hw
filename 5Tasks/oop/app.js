import {
	getLastUpdated,
	setLastUpdated,
	getAllTasks,
	updateAllTasks,
	addNewTask,
	deleteTaskById,
	updateTaskById,
} from '../API/dbOps.js';
import Component from './base_classes.js';
import List from './components/List.js';
import Modal from './components/Modal.js';
class App extends Component {
	constructor() {
		super('div', 'oopStateStorage');
		this.state = {
			items: [
				{
					title: 'Task 1 - default',
					isCompleted: false,
					dateDueJson: '2023-04-13T16:11:22.697Z',
					tag: 'home',
					id: '16813158826971',
				},
				{
					title: 'This page can be navigated with a keyboard',
					isCompleted: false,
					dateDueJson: '2023-04-12T16:11:22.697Z',
					tag: 'work',
					id: '16813158826972',
				},
				{
					title: 'Tasks are saved in localStorage',
					isCompleted: false,
					dateDueJson: '2023-04-11T16:11:22.697Z',
					tag: 'health',
					id: '16813158826973',
				},
			],
			searchRequest: '',
			searchInputFocus: false,
			lastUpdated: 0,
			...this.state,
		};
		this.element.classList.add('main');
	}

	render(props) {
		//
		console.log(this.state);
		//
		const filteredItems = this.state.items.filter((item) =>
			item.title.toLowerCase().includes(this.state.searchRequest.toLowerCase())
		);
		const notcompletedItems = filteredItems.filter(
			(item) => item.isCompleted !== true
		);
		const completedItems = filteredItems.filter(
			(item) => item.isCompleted === true
		);
		const searchEl = new Component('input').render({
			type: 'text',
			placeholder: 'Search Task',
			value: this.state.searchRequest,
			focus: this.state.searchInputFocus,
			onBlur: () => (this.state.searchInputFocus = false),
			onInput: (e) => {
				this.setState({
					...this.state,
					searchInputFocus: true,
					searchRequest: e.target.value,
				});
			},
		});

		return super.render({
			children: [
				new Component('h1').render({ children: 'To Do List' }),
				new Component().render({
					className: 'search-bar',
					children: [
						searchEl,
						new Component('button').render({
							children: '+ New Task',
							className: 'button',
							onClick: this.addItem,
						}),
					],
				}),
				new Component('h2').render({ children: 'All Tasks' }),
				new List().render({
					items: notcompletedItems,
					removeItem: this.removeItem,
					clickCheckbox: this.clickCheckbox,
					id: 'listUndone',
				}),
				new Component('h2').render({ children: 'Completed Tasks' }),
				new List().render({
					items: completedItems,
					clickCheckbox: this.clickCheckbox,
					className: 'list-completed',
					id: 'listDone',
				}),
			],
		});
	}

	loadItems = () => {
		getAllTasks((tasks) => {
			return tasks;
		}).catch((err) => {
			throw err;
			//state.items are loaded from localStorage by default, so leaving this block empty
		});
	};

	uploadItems = (tasks) => {
		updateAllTasks(tasks).then(() => {
			const date = Date.now();
			setLastUpdated(date);
			this.state.lastUpdated = date;
			console.log('success: updated local ' + date + ' to server data');
			super.updateStorage();
		});
	};

	isLocalNewer = (remoteDate) => {
		const isNewer =
			this.state.lastUpdated > remoteDate
				? true
				: this.state.lastUpdated === remoteDate
				? 'equal'
				: false;
		console.log('is local newer?', isNewer);
		return isNewer;
	};

	updateList = () => {
		const filteredItems = this.state.items.filter((item) =>
			item.title.toLowerCase().includes(this.state.searchRequest.toLowerCase())
		);
		const notcompletedItems = filteredItems.filter(
			(item) => item.isCompleted !== true
		);
		const completedItems = filteredItems.filter(
			(item) => item.isCompleted === true
		);
		const newUndone = new List().render({
			items: notcompletedItems,
			removeItem: this.removeItem,
			clickCheckbox: this.clickCheckbox,
			className: 'list-new',
		});
		const newDone = new List().render({
			items: completedItems,
			clickCheckbox: this.clickCheckbox,
			className: 'list-completed',
		});
		document.getElementById('listunDone').replaceWith(newUndone);
		document.getElementById('listDone').replaceWith(newDone);
	};

	addItem = () => {
		const availableTags = ['health', 'work', 'home', 'other'];
		const input = new Component('input').render({
			type: 'text',
			placeholder: 'Task Title',
			className: 'newTaskTitle',
			id: 'taskTitle',
			minLength: '1',
			name: 'taskTitle',
		});
		const dateInput = new Component('input').render({
			type: 'date',
			value: new Date().toJSON().slice(0, 10),
			className: 'datePicker',
		});
		let selectedTag = 'health';
		const selectTags = new Component().render({
			children: [
				...availableTags.map((tag, index) => {
					let checkFirst = index === 0 ? true : false;
					const radio = new Component('input').render({
						type: 'radio',
						checked: checkFirst,
						id: tag,
						name: 'tag',
						children: [tag],
						className: 'radioTab',
					});
					const label = new Component('label').render({
						name: 'tag',
						children: [tag, radio],
						className: ['li-tag', 'newTaskTag', `li-tag-${tag}`],
						tabindex: '0',
						onClick: () => (selectedTag = tag),
						onKeydown: (e) => {
							if (e.code === 'Space' || e.key === 'Enter') {
								label.click();
							}
						},
					});
					return new Component().render({
						children: label,
					});
				}),
			],
			className: 'tagSelector',
		});
		this.props.children.push(
			new Modal().render({
				title: 'New Task',
				children: [
					new Component().render({
						children: [
							input,
							new Component().render({
								children: [selectTags, dateInput],
								className: 'newTask-more',
							}),
						],
						className: 'taskCreator',
					}),
				],
				onAgree: () => {
					this.setState({
						...this.state,
						items: [
							...this.state.items,
							{
								title: input.value,
								isCompleted: false,
								dateDueJson: new Date(dateInput.value).toJSON(),
								tag: selectedTag,
								id: new Date().getTime(),
							},
						],
					});
					this.uploadItems(this.state.items);
				},
				inputElement: input,
			})
		);
		super.render(this.props);
		input.focus();
	};

	removeItem = (id) => {
		this.state.items = this.state.items.filter((item) => item.id !== id);
		this.updateList();
		this.uploadItems(this.state.items);
	};
	clickCheckbox = (id) => {
		this.state.items = this.state.items.map((item) =>
			item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
		);
		this.uploadItems(this.state.items);
	};
}

const app = new App();
document.getElementById('root').appendChild(app.render());

getLastUpdated()
	.then((date) => {
		console.log(
			'lastServerUpdate ' +
				date +
				' last local update: ' +
				app.state.lastUpdated
		);
		const isNewer = app.isLocalNewer(date);
		if (isNewer === 'equal') {
			console.log('everything up to date');
		} else if (isNewer) {
			app.uploadItems().catch((err) => console.log('failed upload', err));
			console.log('update server from local');
		} else {
			app.loadItems().then((items) => {
				app.state.items = items;
				app.state.lastUpdated = date;
				console.log('update local from server with: ', items);
			});
			app.updateStorage();
			app.updateList();
		}
	})
	.catch((error) => console.log(error))
	.finally(() => {
		//app.displayStatus)
		console.log(app);
	});
/*
app opens up with local date,
then if local is newer, local items are sent to server
otherwise re-renders with server-loaded data

every time a new task is created, task is checked or removed,
local is updated via setState, which causes re-renders of the app,
then all items are uploaded to the server
*/

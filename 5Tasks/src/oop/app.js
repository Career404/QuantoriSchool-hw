import {
	getLastUpdated,
	setLastUpdated,
	getAllTasks,
	addNewTask,
	deleteTaskById,
	updateTaskById,
} from '../API/dbOps.js';
import { getGeo, getWeather } from '../API/weather.js';
import checkDaily from '../dailyReminder/daily.js';
import { getTimeOfDay } from '../helpers.js';

import Component from './base_classes.js';
import List from './components/List.js';
import Modal from './components/Modal.js';
import WeatherWidget from './components/WeatherWidget.js';
export default class App extends Component {
	constructor() {
		super('div', 'oopStateStorage');
		this.state = {
			items: [
				{
					title:
						'If weather is not displayed correctly, click it to load new data',
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
					title:
						'These tasks are saved in localStorage, but will update from server when server will come online',
					isCompleted: false,
					dateDueJson: '2023-04-11T16:11:22.697Z',
					tag: 'health',
					id: '16813158826973',
				},
			],
			geo: [41.716667, 44.783333], //Tbilisi coordinates
			weatherLastUpdated: 900000,
			latestWeather: {
				current: {
					condition: {
						icon: "data:image/svg+xml,%3Csvg version='1.1' id='L9' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 100 100' enable-background='new 0 0 0 0' xml:space='preserve'%3E%3Cpath fill='%23808080' d='M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50'%3E%3CanimateTransform attributeName='transform' attributeType='XML' type='rotate' dur='1s' from='0 50 50' to='360 50 50' repeatCount='indefinite' /%3E%3C/path%3E%3C/svg%3E",
					},
					temp_c: 0,
				},
				location: {
					name: 'Loading',
				},
			},
			searchRequest: '',
			searchInputFocus: false,
			lastUpdated: 0,
			...this.state,
		};
		this.element.classList.add('main');
	}

	render(props) {
		//
		//console.log(this.state);
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
				new Component('h1').render({
					children: [
						new Component('h1').render({ children: 'To Do List' }),
						new WeatherWidget().render({
							weather: this.state.latestWeather,
							onLoad: () => {
								if (Date.now() - this.state.weatherLastUpdated >= 600000) {
									this.loadWeather().then(() => this.update());
								}
							},
							onClick: () => {
								this.loadWeather().then(() => this.update());
							},
						}),
					],
					className: 'title',
				}),
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
			onLoad: setTimeout(checkDaily, 100, this.showDaily),
		});
	}

	loadItems = async () => {
		try {
			const tasks = await getAllTasks();
			return tasks;
		} catch (err) {
			throw err;
		}
	};

	addUpdateDate = () => {
		const date = Date.now();
		setLastUpdated(date).catch((err) => {
			throw err;
		});
		this.state.lastUpdated = date;
		this.updateStorage();
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

	/* updateList = () => {
		// I'd rather code everythingfrom scratch again and allow partial re-renders with virtual DOM than use crotches like this
		// re-rendering the whole app is okay as of now
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
			id: 'listUndone',
		});
		const newDone = new List().render({
			items: completedItems,
			clickCheckbox: this.clickCheckbox,
			className: 'list-completed',
			id: 'listDone',
		});
		document.getElementById('listUndone').replaceWith(newUndone);
		document.getElementById('listDone').replaceWith(newDone);
	}; */

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

		const newTaskModal = new Modal().render({
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
				const newTask = {
					title: input.value,
					isCompleted: false,
					dateDueJson: new Date(dateInput.value).toJSON(),
					tag: selectedTag,
					id: new Date().getTime(),
				};
				this.setState({
					items: [...this.state.items, newTask],
				});
				addNewTask(newTask);
				this.props.children = this.props.children.filter(
					(node) => node != newTaskModal
				);
				this.addUpdateDate();
				newTaskModal.remove();
			},
			onCancel: () => {
				this.props.children = this.props.children.filter(
					(node) => node != newTaskModal
				);
				newTaskModal.remove();
			},
			inputElement: input,
		});
		this.props.children.push(newTaskModal);
		super.render(this.props);
		input.focus();
	};

	removeItem = (id) => {
		this.setState({
			items: this.state.items.filter((item) => item.id !== id),
		});
		deleteTaskById(id);
		this.addUpdateDate();
	};
	clickCheckbox = (id) => {
		this.setState({
			items: this.state.items.map((item) =>
				item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
			),
		});
		const checkedItem = this.state.items.find((item) => item.id === id);
		updateTaskById(id, checkedItem);
		this.addUpdateDate();
	};

	loadWeather = async () => {
		console.log('loadWeather() called');
		try {
			const position = await getGeo();
			this.state.geo = [position.coords.latitude, position.coords.longitude];
		} catch (err) {
			console.log('Geolocation failed, ', err);
		}
		const weather = await getWeather(this.state.geo);
		this.state.latestWeather = weather;

		this.state.weatherLastUpdated =
			// this.state.latestWeather.current.last_updated_epoch * 1000;
			// even though using API data would be cool, reality is that
			//weatherAPI does not update weather nearly as often as they claim in their FAQ(every 10 - 15 minutes),
			//and this way the function often results in an endless loop
			Date.now();

		this.updateStorage();
	};

	showDaily = () => {
		const today = new Date();
		const todaysTasks = this.state.items.filter(
			(item) =>
				new Date(item.dateDueJson).toLocaleDateString() ===
					today.toLocaleDateString() && !item.isCompleted
		);

		if (todaysTasks.length > 0) {
			const dailyModal = new Modal().render({
				title: 'Good ' + getTimeOfDay(today),
				children: [
					new Component().render({
						className: 'todaysTasks',
						children: [
							new Component('p').render({
								children: 'You have the next planned tasks for today: ',
							}),
							new Component('ul').render({
								children: todaysTasks.map((task) => {
									return new Component('li').render({
										children: [task.title],
									});
								}),
							}),
						],
					}),
				],

				onAgree: () => {
					this.props.children = this.props.children.filter(
						(node) => node != dailyModal
					);
					dailyModal.remove();
				},
				agreeText: 'Ok',
			});
			this.props.children.push(dailyModal);
			super.render(this.props);
		}
	};

	checkUpdates = () => {
		getLastUpdated()
			.then((date) => {
				const isNewer = this.isLocalNewer(date);
				if (isNewer === 'equal') {
					console.log('everything up to date');
				} else if (isNewer) {
					//no re-render needed
					const idArray = this.state.items.map((item) => item.id);
					idArray.forEach((id, index) => {
						setTimeout(() => {
							deleteTaskById(id)
								.catch((err) => console.log(err))
								.finally(() =>
									setTimeout(
										addNewTask,
										250,
										...this.state.items.filter((item) => item.id === id)
									)
								);
						}, index * 250);
						// calls too often crash the server - timeouts help, however there must be a better solution
						//safe to close before calls are over because even if server loses data, local is saved, and server only updates from local

						//Maybe load tasks from server with getAllTasks,
						//compare to local,
						//update tasks with difference?
						// it's potentially lighter on the server, but complex
					});
					this.addUpdateDate();
					console.log('update server from local');
				} else {
					this.loadItems().then((items) => {
						this.setState({
							items: items,
							lastUpdated: date,
						});
						console.log('update local from server');
					});
				}
			})
			.catch((error) => console.log(error))
			.finally(() => {
				//this.displayStatus()
				console.log(this);
			});
	};
}

/*
app opens up with local data,
then if local is newer, local items are sent to server
otherwise re-renders with server-loaded data

every time a new task is created, task is checked or removed,
local is updated via setState, which causes re-renders of the app,
then all items are uploaded to the server

Problem: if server connection is lost, creating tasks and other actions works fine - they are saved in LS
However when server connection is back online page MUST BE reloaded.
if page is not reloaded and something else happens (new task, complete task, delete task)
changes made while offline will forever be in LS only
momentarily losing connection is a common scenario, fixing this is important
*/

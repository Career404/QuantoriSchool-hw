import {
	checkLastUpdated,
	getAllTasks,
	addNewTask,
	deleteTaskById,
	updateTaskById,
} from '../API/dbOps.js';
import { getGeo, getWeather } from '../API/weather.js';
import checkDaily from '../dailyReminder/daily.js';
import Component from './base_classes.js';
import List from './components/List.js';
import Modal from './components/Modal.js';
import WeatherWidget from './components/Weather.js';
import { getTimeOfDay } from '../helpers.js';
class App extends Component {
	constructor() {
		super('div', 'oopState');
		this.state = {
			geo: [41.716667, 44.783333], //Tbilisi coordinates
			weatherLastUpdated: -600000,
			searchRequest: '',
			searchInputFocus: false,
			localItemsLastUpdated: '0',
			...this.state,
		};
		this.element.classList.add('main');
	}

	async loadWeather() {
		try {
			const position = await getGeo();
			this.state.geo = [position.coords.latitude, position.coords.longitude];
			this.updateStorage({ geo: this.state.geo });
		} catch (err) {
			console.log(err);
		} finally {
			this.state.latestWeather = await getWeather(this.state.geo);
			this.state.weatherLastUpdated =
				this.state.latestWeather.current.last_updated_epoch;
		}
	}
	async loadItems() {
		try {
			const lastUpdatedServer = await checkLastUpdated();
			console.log(lastUpdatedServer);
			if (lastUpdatedServer <= this.state.localItemsLastUpdated) {
				const tasks = await getAllTasks();
				this.state.items = tasks;
				this.updateStorage({ items: tasks });
				this.state.localItemsLastUpdated = Date.now();
			} else {
			}
		} catch (err) {
			console.log(err);
			//Items are loaded from localStorage by default, so leaving this block empty is fine
		}
	}

	async render(props) {
		this.state.items = await this.loadItems();
		if (Date.now() - this.state.weatherLastUpdated >= 600000) {
			await this.loadWeather();
		}
		//
		console.log('render!', this.state);
		//
		if (!Array.isArray(this.state.items) || this.state.items.length === 0) {
			this.state.items = [
				{
					title: 'No tasks',
					isCompleted: false,
					dateDueJson: new Date().toJSON(),
					tag: 'home',
					id: '1681315811826971',
				},
			];
		}
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
				new Component().render({
					children: [
						new Component('h1').render({ children: 'To Do List' }),
						new WeatherWidget().render({
							weather: this.state.latestWeather,
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
				}),
				new Component('h2').render({ children: 'Completed Tasks' }),

				new List().render({
					items: completedItems,
					clickCheckbox: this.clickCheckbox,
					className: 'list-completed',
				}),
			],
			onLoad: setTimeout(checkDaily, 0, this.showDaily),
		});
	}

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
					try {
						addNewTask({
							title: input.value,
							isCompleted: false,
							dateDueJson: new Date(dateInput.value).toJSON(),
							tag: selectedTag,
							id: Date.now(),
						});
						this.update();
					} catch (error) {
						console.log('Sorry, there seems to be a connection error: ', error);
						this.setState({
							...this.state,
							items: [
								...this.state.items,
								{
									title: input.value,
									isCompleted: false,
									dateDueJson: new Date(dateInput.value).toJSON(),
									tag: selectedTag,
									id: Date.now(),
								},
							],
						});
					} finally {
						this.state.localItemsLastUpdated = Date.now();
					}
				},
				inputElement: input,
			})
		);
		super.render(this.props);
		input.focus();
	};

	removeItem = (id) => {
		try {
			deleteTaskById(id);
			this.update();
		} catch (error) {
			console.log('Sorry, there seems to be a connection error: ', error);
			this.setState({
				...this.state,
				items: this.state.items.filter((item) => item.id !== id),
			});
		} finally {
			this.state.localItemsLastUpdated = Date.now();
		}
	};

	clickCheckbox = async (id) => {
		let [itemStorage] = this.state.items.filter((item) => item.id === id);
		try {
			updateTaskById(id, {
				...itemStorage,
				isCompleted: !itemStorage.isCompleted,
			});
			this.update();
		} catch (error) {
			console.log('Sorry, there seems to be a connection error: ', error);
			this.setState({
				...this.state,
				items: this.state.items.map((item) => {
					if (item.id === id) {
						itemStorage = item;
						return { ...item, isCompleted: !item.isCompleted };
					} else return item;
				}),
			});
		} finally {
			this.state.localItemsLastUpdated = Date.now();
		}
	};
	showDaily = () => {
		const today = new Date();
		const todaysTasks = this.state.items.filter(
			(item) =>
				new Date(item.dateDueJson).toLocaleDateString() ===
					today.toLocaleDateString() && !item.isCompleted
		);
		console.log(todaysTasks);

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

				onAgree: () => dailyModal.remove(),
				agreeText: 'Ok',
			});
			this.props.children.push(dailyModal);
			super.render(this.props);
		}
	};
}
const app = new App();
const appRender = await app.render();
document.getElementById('root').append(appRender);

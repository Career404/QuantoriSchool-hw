import {
	getAllTasks,
	addNewTask,
	deleteTaskById,
	updateTaskById,
} from '../database/dbOps.js';
import Component from './base_classes.js';
import List from './components/List.js';
import Modal from './components/Modal.js';
class App extends Component {
	constructor() {
		super();
		//
		//

		this.state = {
			searchRequest: '',
			searchInputFocus: false,
		};
		this.element.classList.add('main');
	}

	//! Only call server when changes happen, store items locally (search is slow)
	//!Save it in localStorage as well, fetch on timer

	async render(props) {
		const items = await getAllTasks();
		this.state = { items, ...this.state };
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
				new Component().render({
					children: [new Component('h1').render({ children: 'To Do List' })],
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
					addNewTask({
						title: input.value,
						isCompleted: false,
						dateDueJson: new Date(dateInput.value).toJSON(),
						tag: selectedTag,
						id: Date.now(),
					});
				},
				inputElement: input,
			})
		);
		super.render(this.props);
		input.focus();
	};

	removeItem = (id) => {
		this.setState({
			...this.state,
			items: this.state.items.filter((item) => item.id !== id),
		});
		deleteTaskById(id);
	};
	clickCheckbox = async (id) => {
		let [itemStorage] = this.state.items.filter((item) => item.id === id);
		console.log(itemStorage);
		/* this.setState({
			...this.state,
			items: this.state.items.map((item) => {
				if (item.id === id) {
					itemStorage = item;
					return { ...item, isCompleted: !item.isCompleted };
				} else return item;
			}),
		}); */
		try {
			updateTaskById(id, {
				...itemStorage,
				isCompleted: !itemStorage.isCompleted,
			});
		} catch (error) {
			console.log('Sorry, there seems to be an error: ', error);
		}
		this.update();
	};
}
const app = new App();
const appAsync = await app.render();
document.getElementById('root').appendChild(appAsync);

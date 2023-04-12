import Component from './base_classes.js';
import List from './components/List.js';
import Modal from './components/Modal.js';
class App extends Component {
	constructor() {
		super('div', 'oopStateStorage');
		if (Object.keys(this.state).length === 0) {
			this.state = {
				items: [
					{
						title: 'Task 1 - default',
						isCompleted: false,
						id: new Date().getTime() + '1',
					},
					{
						title: 'This page can be navigated with a keyboard',
						isCompleted: true,
						id: new Date().getTime() + '2',
					},
					{
						title: 'Tasks are saved in localStorage',
						isCompleted: false,
						id: new Date().getTime() + '3',
					},
				],
				searchRequest: '',
				searchInputFocus: false,
			};
		}
		console.log(this);
	}

	render(props) {
		//
		/* console.log(this.state); */
		//
		this.state.filteredItems = this.state.items.filter((item) =>
			item.title.toLowerCase().includes(this.state.searchRequest.toLowerCase())
		);
		const notcompletedItems = this.state.filteredItems.filter(
			(item) => item.isCompleted !== true
		);
		const completedItems = this.state.filteredItems.filter(
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
					className: 'main',
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
						}),
						new Component('h2').render({ children: 'Completed Tasks' }),

						new List().render({
							items: completedItems,
							removeItem: this.removeItem,
							clickCheckbox: this.clickCheckbox,
						}),
					],
				}),
			],
		});
	}

	addItem = () => {
		const input = new Component('input').render({
			type: 'text',
			placeholder: 'Task Title',
			className: 'newTaskTitle',
			id: 'taskTitle',
			minLength: '1',
			name: 'taskTitle',
		});
		this.props.children.push(
			new Modal().render({
				title: 'New Task',
				children: [
					new Component().render({
						children: [input],
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
								id: new Date().getTime(),
							},
						],
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
	};
	clickCheckbox = (id) => {
		this.setState({
			...this.state,
			items: this.state.items.map((item) =>
				item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
			),
		});
	};
}
document.getElementById('root').appendChild(new App().render());

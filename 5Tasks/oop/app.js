import Component from './base_classes.js';
import List from './components/List.js';
import Modal from './components/Modal.js';
class App extends Component {
	constructor() {
		super();
		this.state = {
			items: [
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
			],
			searchRequest: '',
			searchInputFocus: false,
		};
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
			//! FOCUS
			focus: this.state.searchInputFocus,
			onBlur: () =>
				this.setState({
					...this.state,
					searchInputFocus: false,
				}),
			onInput: (e) => {
				console.log('before focus:', this.state.searchInputFocus);

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

import Component from './base_classes.js';
import Searchbar from './components/SearchBar.js';
import Title from './components/Title.js';
import List from './components/List.js';
import Button from './components/Button.js';
import TaskListItem from './components/ListItem.js';
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
		};
		this.element.classList.add('main');
	}

	render(props) {
		//
		console.log(this.state.items);
		//
		const notcompletedItems = this.state.items.filter(
			(item) => item.isCompleted !== true
		);
		const completedItems = this.state.items.filter(
			(item) => item.isCompleted === true
		);
		return super.render({
			children: [
				new Title().render({ text: 'To Do List', size: 1 }),
				new Searchbar().render({ addItem: this.addItem }),
				new Title().render({ text: 'All Tasks', size: 2 }),
				new List().render({
					items: notcompletedItems,
					removeItem: this.removeItem,
					clickCheckbox: this.clickCheckbox,
				}),
				new Title().render({ text: 'Completed Tasks', size: 2 }),

				new List().render({
					items: completedItems,
					removeItem: this.removeItem,
					clickCheckbox: this.clickCheckbox,
				}),
			],
		});
	}

	addItem = () => {
		this.setState({
			items: [
				...this.state.items,
				{
					title: 'item' + (this.state.items.length + 1),
					isCompleted: false,
					id: new Date().getTime(),
				},
			],
		});
	};
	removeItem = (id) => {
		this.setState({
			items: this.state.items.filter((item) => item.id !== id),
		});
	};
	clickCheckbox = (id) => {
		setItems({
			items: this.state.items.map((item) =>
				item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
			),
		});
	};
}
document.getElementById('root').appendChild(new App().render());

import { Button, List, ListItem } from './components.js';
import Component from './base_classes.js';
class App extends Component {
	constructor() {
		super();
		this.state = {
			items: ['item1', 'item2', 'item3'],
		};
	}

	render(props) {
		console.log(this.state.items);
		return super.render({
			children: [
				new List().render({
					items: this.state.items,
					addItem: this.addItem,
				}),
			],
		});
	}

	addItem = () => {
		this.setState({
			items: [...this.state.items, 'item' + (this.state.items.length + 1)],
		});
	};
}

document.getElementById('root').appendChild(new App().render());

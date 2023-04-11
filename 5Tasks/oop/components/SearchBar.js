import Component from '../base_classes.js';
import Button from './Button.js';
import SearchInput from './SearchInput.js';

export default class Searchbar extends Component {
	constructor() {
		super();
		this.element.classList.add('search-bar');
	}
	render(props) {
		return super.render({
			children: [
				new SearchInput().render(),
				new Button().render({
					text: 'Add item',
					onClick: props.addItem,
				}),
			],
		});
	}
}

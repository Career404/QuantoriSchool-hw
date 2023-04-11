import Component from '../base_classes.js';
import ListItem from './ListItem.js';
import Button from './Button.js';
export default class List extends Component {
	constructor() {
		super();
		this.element = document.createElement('ul');
	}

	/**
	 * @override
	 * @param props
	 * @param props.items {{title: String, isCompleted: Boolean, id: String}[]}
	 * @param props.addItem {function}
	 * @returns {HTMLElement}
	 */
	render(props) {
		return super.render({
			children: [
				...props.items.map((item) =>
					new ListItem().render({
						item: item,
						clickCheckbox: props.clickCheckbox,
						removeItem: props.removeItem,
					})
				),
			],
		});
	}
}

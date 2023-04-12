import Component from '../base_classes.js';
import Icon from './Icon.js';

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
						//? prop drilling, but it's not deep and simple so probably ok
					})
				),
			],
		});
	}
}

class ListItem extends Component {
	constructor() {
		super();
		this.element.classList.add('list-item');
	}
	render(props) {
		const checkbox = new Component('input').render({
			id: `is${props.item.id}Completed`,
			type: 'checkbox',
			checked: props.item.isCompleted,
		});
		const label = new Component('label').render({
			className: 'completed-label',
			children: [
				checkbox,
				new Component('li').render({
					children: [props.item.title],
				}),
			],
			onClick: () => props.clickCheckbox(props.item.id),
		});
		label.htmlFor = checkbox.id;
		const icon = new Icon().render({
			onClick: () => props.removeItem(props.item.id),
			onKeydown: (e) => {
				if (e.code === 'Space' || e.key === 'Enter') {
					props.removeItem(props.item.id);
				}
			},
		});

		props.children = [label, icon];
		return super.render(props);
	}
}
/*
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
				}, */

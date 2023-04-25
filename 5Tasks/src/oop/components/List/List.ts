import Component from '../../base_classes';
import Icon from '../Icon/Icon';
import { formatDate } from '../../../helpers';

import './List.css';

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
						//? prop drilling, but it's not deep and simple and in the same file so probably ok
					})
				),
			],
			...props,
		});
	}
}

class ListItem extends Component {
	render(props) {
		const checkbox = new Component('input').render({
			id: `is${props.item.id}Completed`,
			type: 'checkbox',
			checked: props.item.isCompleted,
		});
		const label = <HTMLLabelElement>new Component('label').render({
			className: 'label',
			children: [
				checkbox,
				new Component('li').render({
					children: [
						new Component('p').render({
							children: [props.item.title],
						}),
						new Component().render({
							children: [
								new Component().render({
									children: props.item.tag,
									className: ['li-tag', `li-tag-${props.item.tag}`],
								}),
								new Component().render({
									children: formatDate(props.item.dateDueJson),
									className: 'li-date',
								}),
							],
							className: 'li-more',
						}),
					],
					className: 'item-info',
				}),
			],
			onClick: () => props.clickCheckbox(props.item.id),
		});
		label.htmlFor = checkbox.id;

		this.element.classList.add('list-item');
		if (props.removeItem) {
			const icon = new Icon().render({
				onClick: () => props.removeItem(props.item.id),
				onKeydown: (e) => {
					if (e.code === 'Space' || e.key === 'Enter') {
						props.removeItem(props.item.id);
					}
				},
			});
			props.children = [label, icon];
		} else {
			props.children = [label];
		}
		return super.render(props);
	}
}

//import Icon from '../Icon/Icon';
import { formatDate } from '../../../utility/helpers';

import './List.css';

interface ListItemProps extends Props {
	item: Task;
	clickCheckbox: Function;
	removeItem?: Function;
}

export default function ListItem({
	item,
	clickCheckbox,
	removeItem,
}: ListItemProps) {
	return <li>{item.title}</li>; /*
	render(props: ListItemProps) {
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
				onKeydown: (e: KeyboardEvent) => {
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
	} */
}

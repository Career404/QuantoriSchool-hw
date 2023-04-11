import Component from '../base_classes.js';
import Icon from './Icon.js';
export default class ListItem extends Component {
	constructor() {
		super();
		this.element.classList.add('list-item');
	}
	render(props) {
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.id = `is${props.item.id}Completed`;
		checkbox.checked = props.item.isCompleted;
		const label = document.createElement('label');
		label.htmlFor = checkbox.id;
		label.classList.add('completed-label');
		const liEl = document.createElement('li');
		liEl.textContent = props.item.title;
		label.append(checkbox, liEl);
		label.onclick = () => props.clickCheckbox(props.item.id);
		const icon = new Icon().render({
			onClick: () => props.removeItem(props.item.id),
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

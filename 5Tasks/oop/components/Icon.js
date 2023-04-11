import Component from '../base_classes.js';

export default class Icon extends Component {
	render(props) {
		const icon = (props && props.icon) || 'delete';
		const text = (props && props.text) || '';
		this.element.classList.add(`${icon}-icon`);
		if (props && props.onClick) {
			this.element.classList.add('icon-interactive');
			this.element.tabIndex = 0;
		}
		props.children = text;
		return super.render(props);
	}
}

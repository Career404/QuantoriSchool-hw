import Component from '../../base_classes';

import './Icon.css';

interface IconProps extends Props {
	icon?: string;
	text?: string;
}

export default class Icon extends Component {
	render(props: IconProps) {
		const icon = (props && props.icon) || 'delete';
		const text = (props && props.text) || '';
		this.element.classList.add(`${icon}-icon`);
		if (props && props.onClick) {
			this.element.classList.add('icon-interactive');
			this.element.tabIndex = 0;
		}
		if (props.text) {
			props.children = text;
		}
		return super.render(props);
	}
}

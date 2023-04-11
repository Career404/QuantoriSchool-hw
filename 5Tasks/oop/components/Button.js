import Component from '../base_classes.js';
export default class Button extends Component {
	constructor() {
		super();
		this.element = document.createElement('button');
		this.element.classList.add('button');
	}
	render(props) {
		return super.render({
			onClick: props.onClick,
			children: props.text,
		});
	}
}

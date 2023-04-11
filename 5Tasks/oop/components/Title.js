import Component from '../base_classes.js';

export default class Title extends Component {
	/**
	 * @override
	 * @param props
	 * @param props.text {string}
	 * @param props.size {number}
	 * @returns {HTMLHeadingElement}
	 */
	render({ text = 'Heading', size = 2 }) {
		this.element = document.createElement(`h${size}`);
		this.element.innerHTML = text;
		return this.element;
	}
}

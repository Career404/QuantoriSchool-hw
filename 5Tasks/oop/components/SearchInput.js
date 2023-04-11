import Component from '../base_classes.js';
export default class SearchInput extends Component {
	constructor() {
		super();
		this.element = document.createElement('input');
		this.element.type = 'text';
		this.element.placeholder = 'Search Task'; /*
		this.element.tabIndex = -1; */
	}
	render(props) {
		this.element.oninput = () => {
			this.setState(this.element.value); /*
			console.log(this.element.value); */
		};
		return super.render();
	}
}

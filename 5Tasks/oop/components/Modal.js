import Component from '../base_classes.js';

export default class Modal extends Component {
	constructor() {
		super();
		this.element.classList.add('fullscreen');
		this.element.onclick = () => this.element.remove();
	}
	render(props) {
		const cancelButton = new Component('button').render({
			children: 'Cancel',
			onClick: () => this.element.remove(),
			className: ['button', 'cancel-button'],
		});

		let agreeButton;
		if (props.title === 'New Task') {
			agreeButton = new Component('button').render({
				type: 'submit',
				children: 'Add Task',
				onClick: () => {
					props.agreeCallbackParam
						? props.onAgree(props.agreeCallbackParam)
						: props.onAgree();
				},
				className: ['button', 'agree-button'],
			});
			agreeButton.disabled = true;
			if (props.inputElement) {
				props.inputElement.addEventListener('input', () =>
					props.inputElement.value.length < 1
						? (agreeButton.disabled = true)
						: (agreeButton.disabled = false)
				);
				props.inputElement.addEventListener('keydown', (e) => {
					if (e.key === 'Enter') {
						agreeButton.click();
					}
				});
			}
		} else {
			agreeButton = new Component('button').render({
				children: props.agreeText || 'Agree',
				type: 'submit',
				onClick: () => {
					props.agreeCallbackParam
						? props.onAgree(props.agreeCallbackParam)
						: props.onAgree();
				},
				className: ['button', 'agree-button'],
			});
		}

		props.children = [
			new Component('form').render({
				//? use div instead of form (Form submission canceled because the form is not connected)
				className: 'modal',
				onClick: (e) => e.stopPropagation(),
				onSubmit: (e) => e.preventDefault(),
				children: [
					new Component('h3').render({ children: props.title }),
					...props.children,
					new Component().render({
						className: 'buttons-container',
						children: [cancelButton, agreeButton],
					}),
				],
			}),
		];
		return super.render(props);
	}
}

import Component from '../base_classes.js';

export default class Modal extends Component {
	constructor() {
		super();
		this.element.classList.add('fullscreen');
		this.element.onclick = () => this.element.remove();
	}
	render(props) {
		if (props.onCancel) {
			this.element.onclick = props.onCancel;
		}

		let cancelButton;
		let agreeButton;
		let displayedButtons;

		if (props.title === 'New Task') {
			agreeButton = new Component('button').render({
				type: 'submit',
				children: 'Add Task',
				onClick: () => {
					props.agreeCallbackParam
						? props.onAgree(props.agreeCallbackParam)
						: props.onAgree();
					this.element.remove();
				},
				className: ['button', 'agree-button'],
			});
			agreeButton.disabled = true;

			cancelButton = new Component('button').render({
				children: 'Cancel',
				onClick: () => {
					props.onCancel ? props.onCancel() : this.element.remove();
				},
				className: ['button', 'cancel-button'],
			});

			displayedButtons = [cancelButton, agreeButton];

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
				children: props.agreeText || 'Continue',
				type: 'submit',
				onClick: () => {
					props.agreeCallbackParam
						? props.onAgree(props.agreeCallbackParam)
						: props.onAgree();
				},
				className: ['button', 'agree-button'],
			});
			displayedButtons = [agreeButton];
		}

		props.children = [
			new Component().render({
				className: 'modal',
				onClick: (e) => e.stopPropagation(),
				children: [
					new Component('h3').render({ children: props.title }),
					...props.children,
					new Component().render({
						className: 'buttons-container',
						children: displayedButtons,
					}),
				],
			}),
		];
		return super.render(props);
	}
}

import JustValidate from '../libs/just-validate.min';

const formInputMask = () => {
	let inputsPhone = document.querySelectorAll('input[type="tel"]');
	let im = new Inputmask('+7 (999) 999-99-99');
	im.mask(inputsPhone);
};

const rules = [
	{
		rule: 'required',
		value: true,
		errorMessage: 'Телефон обязателен',
	},
	// {
	// 	rule: 'function',
	// 	validator: function () {
	// 		const phone = telSelector.inputmask.unmaskedvalue();
	// 		return phone.length === 10;
	// 	},
	// 	errorMessage: 'Введите корректный телефон',
	// },
];

const validationModal = new JustValidate('.modal-form');

validationModal.addField('input[type="tel"]', rules).onSuccess((event) => {
	let formData = new FormData(event.target);

	console.log(...formData); // ! DELETE

	let xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('Отправлено'); // ! DELETE
			}
		}
	};

	xhr.open('POST', 'mail.php', true);
	xhr.send(formData);

	event.target.reset();
});

try {
	formInputMask();
} catch (error) {}

export default formInputMask;

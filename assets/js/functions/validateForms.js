import JustValidate from '../libs/just-validate.min';

const modalSend = document.getElementById('modalSend');

const formInputMask = () => {
	let inputsPhone = document.querySelectorAll('input[type="tel"]');
	let im = new Inputmask('+7 (999) 999-99-99');
	im.mask(inputsPhone);
};

const telRules = [
	{
		rule: 'required',
		value: true,
		errorMessage: 'Телефон обязателен',
	},
	{
		rule: 'function',
		validator: function (isChange, fields) {
			const telElem = fields['input[type="tel"]'].elem;
			const phone = telElem.inputmask.unmaskedvalue();
			return phone.length === 10;
		},
		errorMessage: 'Некорректные данные ввода',
	},
];

const buttonRules = [
	{
		rule: 'function',
		validator: function () {
			return true;
		},
	},
];

const politikalRules = [
	{
		rule: 'required',
		value: false,
		errorMessage: 'Согласитесь с обработкой персональных данных',
	},
	{
		rule: 'function',
		validator: function (isChecked, fields) {
			const submit = fields['.contacts-info__submit'].elem;
			if (!isChecked) {
				submit.setAttribute('disabled', 'disabled');
				return false;
			} else {
				submit.removeAttribute('disabled');
				return true;
			}
		},
		errorMessage: 'Согласитесь с обработкой персональных данных',
	},
];

const validationModal = new JustValidate('.modal-form');

validationModal
	.addField('input[type="tel"]', telRules)
	.addField('.contacts-info__submit', buttonRules)
	.addField('.politikal', politikalRules)
	.onSuccess((event) => {
		const target = event.target;
		const modal = target.closest('.modal');
		let formData = new FormData(target);

		let xhr = new XMLHttpRequest();

		xhr.open('POST', 'mail.php', true);
		xhr.send(formData);

		modal.classList.remove('open');

		modalSend.classList.add('open');

		target.reset();

		const selectes = document.querySelectorAll('.select__current');
		selectes.forEach((select) => {
			select.setAttribute('size', select.placeholder.length);
		});
	});

try {
	const situationModal = new JustValidate('.situation-form');
	situationModal
		.addRequiredGroup('.form-blog__labels', 'Выберите как минимум один вариант')
		.addField('input[type="tel"]', telRules)
		.addField('.contacts-info__submit', buttonRules)
		.addField('.politikal', politikalRules)
		.onSuccess((event) => {
			const target = event.target;
			const modal = target.closest('.modal');
			let formData = new FormData(target);

			let xhr = new XMLHttpRequest();

			xhr.open('POST', 'mail.php', true);
			xhr.send(formData);

			modalSend.classList.add('open');

			target.reset();

			const selectes = document.querySelectorAll('.select__current');
			selectes.forEach((select) => {
				select.setAttribute('size', select.placeholder.length);
			});
		});
} catch {}

try {
	const delegationModal = new JustValidate('.delegation-form');

	delegationModal
		.addRequiredGroup('.form-blog__labels', 'Выберите один вариант')
		.addField('input[type="tel"]', telRules)
		.addField('.contacts-info__submit', buttonRules)
		.addField('.politikal', politikalRules)
		.onSuccess((event) => {
			const target = event.target;
			const modal = target.closest('.modal');
			let formData = new FormData(target);

			let xhr = new XMLHttpRequest();

			xhr.open('POST', 'mail.php', true);
			xhr.send(formData);

			modalSend.classList.add('open');

			target.reset();

			const selectes = document.querySelectorAll('.select__current');
			selectes.forEach((select) => {
				select.setAttribute('size', select.placeholder.length);
			});
		});
} catch {}

try {
	const facilitiesModal = new JustValidate('.facilities-form');

	facilitiesModal
		.addRequiredGroup('.form-blog__labels', 'Выберите один вариант')
		.addField('input[type="tel"]', telRules)
		.addField('.contacts-info__submit', buttonRules)
		.addField('.politikal', politikalRules)
		.onSuccess((event) => {
			const target = event.target;
			const modal = target.closest('.modal');
			let formData = new FormData(target);

			let xhr = new XMLHttpRequest();

			xhr.open('POST', 'mail.php', true);
			xhr.send(formData);

			modalSend.classList.add('open');

			target.reset();

			const selectes = document.querySelectorAll('.select__current');
			selectes.forEach((select) => {
				select.setAttribute('size', select.placeholder.length);
			});
		});
} catch {}

try {
	const quoteSavingModal = new JustValidate('.quote-saving-form');

	quoteSavingModal
		.addRequiredGroup('.form-blog__labels', 'Выберите один вариант')
		.addField('input[type="tel"]', telRules)
		.addField('.contacts-info__submit', buttonRules)
		.addField('.politikal', politikalRules)
		.onSuccess((event) => {
			const target = event.target;
			const modal = target.closest('.modal');
			let formData = new FormData(target);

			let xhr = new XMLHttpRequest();

			xhr.open('POST', 'mail.php', true);
			xhr.send(formData);

			modalSend.classList.add('open');

			target.reset();

			const selectes = document.querySelectorAll('.select__current');
			selectes.forEach((select) => {
				select.setAttribute('size', select.placeholder.length);
			});
		});
} catch {}

try {
	formInputMask();
} catch (error) {}

export default formInputMask;

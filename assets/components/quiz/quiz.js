import formInputMask from '../../js/functions/validateForms';
import quizData from './quizData';

const quizTemplate = (data = [], dataLength, options) => {
	const { number, title } = data;
	const { nextBtnText, sendBtnText } = options;
	const answers = data.answers.map((item) => {
		if (item.type === 'radio') {
			return `
				<label class="quiz-question__label">
					<input class="quiz-question__radio-real" name="${data.answer_alias}" value="${item.answer_title}" type="radio" data-valid="false" />
					<span class="quiz-question__radio-fake"></span>
					<span>${item.answer_title}</span>
				</label>
			`;
		} else if (item.type === 'text') {
			return `
				<label class="quiz-question__label">
					<input class="quiz-question__radio-real" name="${data.answer_alias}" value="${item.answer_title}" type="radio" data-valid="false" />
					<span class="quiz-question__radio-fake"></span>
					<span>${item.answer_title}</span>
					<input type="${item.type}" data-valid="false" class="quiz-question__answer" name="${data.answer_alias}">
				</label>
			`;
		} else if (item.type === 'square') {
			return `
			<label class="quiz-question__label">
					<input class="quiz-question__answer" type="text" data-valid="false" pattern="\d [0-9]" placeholder="М²" name="${data.answer_alias}">
			</label>
			`;
		} else if (item.type === 'checkbox') {
			return `
			<label class="quiz-question__label">
				<input class="quiz-question__checkbox-real" type="checkbox" name="${data.answer_alias}" value="${item.answer_title}" data-valid="false">
				<div class="quiz-question__checkbox-fake"></div>
				<span>${item.answer_title}</span>
			</label>
			`;
		} else if (item.type === 'name') {
			return `
			<label class="quiz-question__label">
					<input class="quiz-question__answer" type="text" data-valid="false" name="${data.answer_alias}" value="${item.answer_title}" placeholder="Ваше имя">
					<span>${item.answer_title}</span>
			</label>
			`;
		} else if (item.type === 'tel') {
			return `
			<label class="quiz-question__label">
					<input class="quiz-question__answer" type="tel" data-valid="false" name="${data.answer_alias}" value="${item.answer_title}" placeholder="+7 (___) ___-__-__">
					<span>${item.answer_title}</span>
			</label>
			`;
		}
	});

	if (data.answer_alias === 'Имя и телефон') {
		return `
		<div class="quiz__content">
			<div class="quiz__header quiz-header quiz-header--margin">
				<h3 class="quiz-header__title">${title}</h3>
				<div class="quiz-header__num">0${number}<span class="quiz-header__num--gray">/0${dataLength}</span></div>
			</div>
			<p class="quiz__text">Мы свяжемся с вами в рабочее
			<br>
			время: пн.–пт. с 9 до 18</p>
			<div class="quiz-question">
				<div class="quiz-question__answers quiz-question__answers--margin">
					${answers.join('')}
					<button type="button" class="quiz-question__send link btn-reset" data-send>
						${sendBtnText}
						<span class="link__svg">
						</span>
					</button>
					<label class="quiz-question__label">
							<input class="quiz-question__checkbox-real" type="checkbox" data-valid="false">
	<div class="quiz-question__checkbox-fake"></div>
						<p class="quiz-question__policy">
							Согласен(на) на обработку персональных данных в соответствии с <a class="quiz-question__link link-reset" target="_blank" href="politikal.html">Политикой
								конфиденциальности</a>
						</p>
					</label>
				</div>
			</div>
		</div>


		`;
	} else {
		return `
		<div class="quiz__content">
			<div class="quiz__header quiz-header">
				<h3 class="quiz-header__title">${title}</h3>
				<div class="quiz-header__num">0${number}<span class="quiz-header__num--gray">/0${dataLength}</span></div>
			</div>
		<div class="quiz-question">
				<div class="quiz-question__answers">
					${answers.join('')}
				</div>
				<div class="quiz-question__btns">
				<button type="button" class="quiz-question__btn quiz-question__btn--margin btn-reset" data-next-btn>
					${nextBtnText}
				</button>
				</div>
			</div>
		</div>

	`;
	}
};

class Quiz {
	constructor(selector, data, options) {
		this.$el = document.querySelector(selector);
		this.options = options;
		this.data = data;
		this.counter = 0;
		this.dataLength = this.data.length;
		this.resultArray = [];
		this.tmp = {};
		this.init();
		this.events();
	}

	init() {
		this.$el.innerHTML = quizTemplate(quizData[this.counter], this.dataLength, this.options);
	}

	events() {
		this.$el.addEventListener('click', (e) => {
			if (e.target == document.querySelector('[data-next-btn]')) {
				this.addToSend();
				this.nextQuestion();
			}
			if (e.target == document.querySelector('[data-prev-btn]')) {
				this.removeFromSend();
				this.prevQuestion();
			}
			if (e.target == document.querySelector('[data-send]')) {
				this.addToSend();
				this.send();
			}
		});

		this.$el.addEventListener('change', (e) => {
			if (e.target.tagName == 'INPUT') {
				if (e.target.type !== 'checkbox' && e.target.type !== 'radio') {
					let elements = this.$el.querySelectorAll('input');

					elements.forEach((el) => (el.checked = false));
				}

				this.tmp = this.serialize(this.$el);
			}
		});

		this.$el.addEventListener('input', (e) => {
			const target = e.target;
			if (target.name === 'Тип объекта' && target.type === 'text') {
				const radio = target
					.closest('.quiz-question__label')
					.querySelector('.quiz-question__radio-real');

				radio.checked = true;
			}
		});
	}

	nextQuestion() {
		if (this.valid()) {
			if (this.counter + 1 < this.dataLength) {
				this.counter++;
				this.$el.innerHTML = quizTemplate(quizData[this.counter], this.dataLength, this.options);

				if (this.counter !== 0 && this.counter + 1 !== this.dataLength) {
					const nextBtn = this.$el.querySelector('.quiz-question__btn');
					nextBtn.outerHTML = `
		      <button type="button" class="quiz-question__btn quiz-question__btn--prev btn-reset" data-prev-btn>${this.options.prevBtnText}</button>
		      <button type="button" class="quiz-question__btn btn-reset" data-next-btn="">${this.options.nextBtnText}</button>
		      `;
				}

				if (this.counter + 1 === this.dataLength) {
					formInputMask();
				}
			}
		}
	}

	prevQuestion() {
		this.counter--;
		this.$el.innerHTML = quizTemplate(quizData[this.counter], this.dataLength, this.options);

		if (this.counter !== 0) {
			const nextBtn = this.$el.querySelector('.quiz-question__btn');
			nextBtn.outerHTML = `
          <button type="button" class="quiz-question__btn quiz-question__btn--prev btn-reset" data-prev-btn>${this.options.prevBtnText}</button>
          <button type="button" class="quiz-question__btn btn-reset" data-next-btn="">${this.options.nextBtnText}</button>
          `;
		}
	}

	valid() {
		let isValid = false;
		let elements = this.$el.querySelectorAll('input');
		elements.forEach((el) => {
			switch (el.type) {
				case 'text':
					el.value
						? (isValid = true)
						: el.closest('.quiz-question__label').classList.add('quiz-question__label--error');
				case 'tel':
					el.value
						? (isValid = true)
						: el.closest('.quiz-question__label').classList.add('quiz-question__label--error');
				case 'checkbox':
					el.checked
						? (isValid = true)
						: el.closest('.quiz-question__label').classList.add('quiz-question__label--error');
				case 'radio':
					el.checked
						? (isValid = true)
						: el.closest('.quiz-question__label').classList.add('quiz-question__label--error');
			}

			setTimeout(() => {
				el.closest('.quiz-question__label').classList.remove('quiz-question__label--error');
			}, 700);
		});

		return isValid;
	}

	removeFromSend() {
		this.resultArray.pop();
	}

	addToSend() {
		this.resultArray.push(this.tmp);
	}

	send() {
		const modalSend = document.getElementById('modalSend');
		let elements = this.$el.querySelectorAll('input');
		let isValid = true;
		elements.forEach((el) => el.classList.remove('quiz-question__label--error'));

		elements.forEach((el) => {
			switch (el.type) {
				case 'text':
					if (!el.value) isValid = false;

					break;

				case 'tel':
					if (!el.value) isValid = false;

					break;

				case 'checkbox':
					if (!el.checked) isValid = false;

					break;

				default:
			}
		});

		if (isValid) {
			const formData = new FormData();

			for (let item of this.resultArray) {
				for (let obj in item) {
					formData.append(obj, item[obj].substring(0, item[obj].length - 2));
				}
			}

			const response = fetch('mail.php', {
				method: 'POST',
				body: formData,
			});

			console.log('отправлено!');

			modalSend.classList.add('open');

			this.$el.reset();
		}
	}

	serialize(form) {
		let field,
			s = {};
		let valueString = '';
		if (typeof form == 'object' && form.nodeName == 'FORM') {
			let len = form.elements.length;
			for (let i = 0; i < len; i++) {
				field = form.elements[i];

				if (
					field.name &&
					!field.disabled &&
					field.type != 'file' &&
					field.type != 'reset' &&
					field.type != 'submit' &&
					field.type != 'button'
				) {
					if (field.type == 'select-multiple') {
						for (j = form.elements[i].options.length - 1; j >= 0; j--) {
							if (field.options[j].selected)
								s[s.length] =
									encodeURIComponent(field.name) + '=' + encodeURIComponent(field.options[j].value);
						}
					} else if (
						(field.type != 'checkbox' && field.type != 'radio' && field.value) ||
						field.checked
					) {
						valueString += field.value + ', ';

						s[field.name] = valueString;
					}
				}
			}
		}
		return s;
	}
}

try {
	window.quiz = new Quiz('.quiz__form', quizData, {
		sendBtnText: 'Оставить заявку',
		nextBtnText: 'Далее',
		prevBtnText: 'Назад',
	});
} catch {}

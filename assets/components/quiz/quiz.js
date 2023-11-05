import quizData from './quizData';

const quizTemplate = (data = [], dataLength, options) => {
	const { number, title } = data;
	const { nextBtnText } = options;
	const answers = data.answers.map((item) => {
		if (item.type === 'radio') {
			return `
			<label class="quiz-question__label">
					<input class="quiz-question__answer" type="radio" data-valid="false" name="${data.answer_alias}" value="${item.answer_title}">
					<span>${item.answer_title}</span>
			</label>
		`;
		} else if (item.type === 'text') {
			return `
			<label class="quiz-question__label">
					<input class="quiz-question__answer" type="radio" data-valid="false" name="${data.answer_alias}">
					<span>${item.answer_title}</span>
					<input type="${item.type}" data-valid="false" class="quiz-question__answer" name="${data.answer_alias}">
			</label>
			`;
		} else if (item.type === 'square') {
			return `
			<label class="quiz-question__label">
					<input class="quiz-question__answer" type="text" data-valid="false" placeholder="М²" name="${data.answer_alias}">
			</label>
			`;
		} else if (item.type === 'checkbox') {
			return `
			<label class="quiz-question__label">
					<input class="quiz-question__answer" type="checkbox" data-valid="false" name="${data.answer_alias}" value="${item.answer_title}">
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
		} else if (item.type === 'phone') {
			return `
			<label class="quiz-question__label">
					<input class="quiz-question__answer" type="text" data-valid="false" name="${data.answer_alias}" value="${item.answer_title}">
					<span>${item.answer_title}</span>
			</label>
			`;
		} else if (item.type === 'policy') {
			return `
			<label class="quiz-question__label">
					<input class="quiz-question__answer" type="checkbox" data-valid="false" name="${data.answer_alias}" value="${item.answer_title}">
					<span>${item.answer_title}</span>
					<p class="quiz-question__policy">
						Согласен(на) на обработку персональных данных в соответствии с <a class="quiz-question__link">Политикой конфиденциальности</a>
					</p>
			</label>
			`;
		}
	});

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
					<span>${nextBtnText}</span>
				</button>
				</div>
			</div>
		</div>

	`;
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
		console.log('init!');
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
	}

	nextQuestion() {
		console.log(this.resultArray);
		if (this.valid()) {
			console.log('next question!');
			if (this.counter + 1 < this.dataLength) {
				this.counter++;
				this.$el.innerHTML = quizTemplate(quizData[this.counter], this.dataLength, this.options);

				if (this.counter !== 0) {
					const nextBtn = this.$el.querySelector('.quiz-question__btn');
					nextBtn.outerHTML = `
          <button type="button" class="quiz-question__btn quiz-question__btn--prev btn-reset" data-prev-btn><span>${this.options.prevBtnText}</span></button>
          <button type="button" class="quiz-question__btn btn-reset" data-next-btn=""><span>${this.options.nextBtnText}</span></button>
          `;
				}

				if (this.counter + 1 == this.dataLength) {
					this.$el.insertAdjacentHTML(
						'beforeend',
						`<button type="button" class="quiz-question__send link btn-reset" data-send>
						<span class="link__text">${this.options.sendBtnText}</span>
							<svg class="link__svg">
									<use href="img/icons/sprite.svg#arrow"></use>
							</svg>
						</button>`,
					);
					this.$el.querySelector('[data-next-btn]').remove();
					this.$el.querySelector('[data-prev-btn]').remove();
				}
			}
		}
	}

	prevQuestion() {
		console.log(this.resultArray);

		this.counter--;
		this.$el.innerHTML = quizTemplate(quizData[this.counter], this.dataLength, this.options);

		if (this.counter !== 0) {
			const nextBtn = this.$el.querySelector('.quiz-question__btn');
			nextBtn.outerHTML = `
          <button type="button" class="quiz-question__btn quiz-question__btn--prev btn-reset" data-prev-btn><span>${this.options.prevBtnText}</span></button>
          <button type="button" class="quiz-question__btn btn-reset" data-next-btn=""><span>${this.options.nextBtnText}</span></button>
          `;
		}
	}

	valid() {
		let isValid = false;
		let elements = this.$el.querySelectorAll('input');
		elements.forEach((el) => {
			switch (el.type) {
				case 'text':
					el.value ? (isValid = true) : el.classList.add('error');
				case 'checkbox':
					el.checked ? (isValid = true) : el.classList.add('error');
				case 'radio':
					el.checked ? (isValid = true) : el.classList.add('error');
			}
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
		if (this.valid()) {
			console.log('send!');

			let elements = this.$el.querySelectorAll('input');
			elements.forEach((el) => el.classList.remove('error'));

			const formData = new FormData();

			for (let item of this.resultArray) {
				for (let obj in item) {
					formData.append(obj, item[obj].substring(0, item[obj].length - 1));
				}
			}

			const response = fetch('mail.php', {
				method: 'POST',
				body: formData,
			});
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
						valueString += field.value + ',';

						s[field.name] = valueString;
					}
				}
			}
		}
		return s;
	}
}

window.quiz = new Quiz('.quiz__form', quizData, {
	sendBtnText: 'Оставить заявку',
	nextBtnText: 'Далее',
	prevBtnText: 'Назад',
});

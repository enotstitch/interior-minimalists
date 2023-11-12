let select = function () {
	let selectHeader = document.querySelectorAll('.select__header');
	let selectItem = document.querySelectorAll('.select__item');

	window.addEventListener('click', (event) => {
		const select = document.querySelector('.select');
		const isSelectActive = select.classList.contains('is-active');
		const isSelectClick = event.target.closest('.select');

		if (isSelectActive && !isSelectClick) {
			select.classList.remove('is-active');
		}
	});

	selectHeader.forEach((item) => {
		item.addEventListener('click', selectToggle);
	});

	selectItem.forEach((item) => {
		item.addEventListener('click', selectChoose);
	});

	function selectToggle() {
		this.parentElement.classList.toggle('is-active');
	}

	function selectChoose() {
		let text = this.innerText;
		let select = this.closest('.select');
		let currentInput = select.querySelector('.select__current');

		currentInput.value = text;
		currentInput.setAttribute('size', currentInput.value.length);

		select.classList.remove('is-active');
	}
};

select();

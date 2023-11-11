const formInputMask = () => {
	let inputsPhone = document.querySelectorAll('input[type="tel"]');
	let im = new Inputmask('+7 (999) 999-99-99');
	im.mask(inputsPhone);
};

try {
	console.log(42);
	formInputMask();
} catch {}

export default formInputMask;

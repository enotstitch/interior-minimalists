export default function menuLinkCurrent() {
	const activeUrl = window.location.pathname;
	const menuLinks = document.querySelectorAll('.menu__link');

	menuLinks.forEach((link) => {
		let currentLinkHref = link.attributes.href.value;

		link.classList.remove('menu__link--current');

		if (activeUrl.includes(currentLinkHref)) {
			link.classList.add('menu__link--current');
		}
	});
}

menuLinkCurrent();

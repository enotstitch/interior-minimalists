export default function menuLinkCurrent() {
	const activeUrl = window.location.pathname;
	const menuLinks = document.querySelectorAll('.menu__link');
	const currentMenuLinks = document.querySelector('.menu__link--current');

	menuLinks.forEach((link) => {
		let currentLinkHref = link.dataset.url;

		if (activeUrl.includes(currentLinkHref)) {
			currentMenuLinks.classList.remove('menu__link--current');
			link.classList.add('menu__link--current');
		}
	});
}

menuLinkCurrent();

import { Pagination } from 'swiper/modules';

import Swiper from 'swiper';

const swiper = new Swiper('.swiper', {
	modules: [Pagination],
	speed: 400,
	loop: false,

	pagination: {
		enabled: true,
		el: '.swiper__pagination',
		bulletClass: 'swiper__pagination-num',
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + '</span>';
		},
	},

	effect: 'coverflow',
});

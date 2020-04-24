(function aboutCarousel() {
	'use strict';

	const nextOrFirst = function (domElement) {
		return domElement.nextElementSibling
			? domElement.nextElementSibling
			: domElement.parentElement.firstElementChild;
	};

	const prevOrLast = function (domElement) {
		return domElement.previousElementSibling
			? domElement.previousElementSibling
			: domElement.parentElement.lastElementChild;
	};

	const toggleClass = (element, className) =>
		element.classList.toggle(className);

	const removeClass = (element, className) =>
		element.classList.remove(className);

	const toggleHidden = (elements) =>
		elements.forEach(element => toggleClass(element, 'hidden'));

	const toggleCurrent = element => toggleClass(element, 'current');

	window.addEventListener('load', function () {
		setInterval(function () {
			const currentIndex = document.querySelector('#top .index.current');
			toggleCurrent(currentIndex);
			toggleHidden(document.querySelectorAll(`#top [data-for="${currentIndex.dataset.id}"`));

			const nextIndex = nextOrFirst(currentIndex);
			toggleCurrent(nextIndex);
			toggleHidden(document.querySelectorAll(`#top [data-for="${nextIndex.dataset.id}`));
		}, 5000);
	});

	document
		.querySelectorAll('.indicator-right')
		.forEach(indicator => indicator.addEventListener('click', function (event) {
			const current = event.target.parentElement.parentElement.querySelector('.current');
			toggleCurrent(current);
			toggleClass(current, 'hidden');
			removeClass(current, 'slide-left');
			removeClass(current, 'slide-right');

			const next = nextOrFirst(current);
			toggleCurrent(next);
			toggleClass(next, 'hidden');
			toggleClass(next, 'slide-left');
			removeClass(next, 'slide-right');
		}));

	document
		.querySelectorAll('.indicator-left')
		.forEach(indicator => indicator.addEventListener('click', function (event) {
			const current = event.target.parentElement.parentElement.querySelector('.current');
			toggleCurrent(current);
			toggleClass(current, 'hidden');
			removeClass(current, 'slide-right');
			removeClass(current, 'slide-left');

			const prev = prevOrLast(current);
			toggleCurrent(prev);
			toggleClass(prev, 'hidden');
			toggleClass(prev, 'slide-right');
			removeClass(prev, 'slide-left');
		}));
})();

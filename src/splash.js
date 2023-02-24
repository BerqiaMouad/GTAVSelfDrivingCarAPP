const dots = document.querySelector('.loading_dots');

const addAnimation = () => {
	dots.classList.add('animate');
	setTimeout(() => {
		dots.classList.remove('animate');

		setTimeout(() => {
			addAnimation();
		}, 10);
	}, 2600);
}

addAnimation();

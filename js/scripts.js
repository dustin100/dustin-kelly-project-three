$(document).ready(function() {
	const cardGameApp = {};

	cardGameApp.cards = [1, 1, 2, 2, 3, 3];

	$('.card').on('click', function() {
		$(this).toggleClass('cardFlip');
		console.log(this);
		console.log($(this).attr('data-card'));
	});
});

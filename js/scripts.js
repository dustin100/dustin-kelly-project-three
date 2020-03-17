$(document).ready(function() {
	const cardGameApp = {};

	let firstClick = '';
	let secondClick = '';
	let hasBeenFlipped = false;

	// on click toggles class cardFlip and gives it the card flipping effect

	$('.card').on('click', function() {
		if (hasBeenFlipped === false) {
			$(this).toggleClass('cardFlip');
			hasBeenFlipped = true;
			// sets variable on first click
			firstClick = $(this).attr('data-card');
			console.log(firstClick + 'clickOne');
		} else {
			$(this).toggleClass('cardFlip');
			hasBeenFlipped = false;
			// sets variable on second click
			secondClick = $(this).attr('data-card');
			console.log(secondClick + 'clickTwo');

			setTimeout(doesItMatch, 1000);
		}
	});

	const doesItMatch = function() {
		if (firstClick === secondClick) {
			console.log(`it's a match`);
		} else {
			console.log(`try again`);
			resetCardsIfNotMatch();
		}
	};

	const resetCardsIfNotMatch = function() {
		$('.card').removeClass('cardFlip');
	};
});

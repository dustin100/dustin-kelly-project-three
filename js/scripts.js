$(document).ready(function() {
	let firstClick = '';
	let secondClick = '';
	let hasBeenFlipped = false;

	// on click toggles class cardFlip and gives it the card flipping effect

	$('.card').on('click', function() {
		if (hasBeenFlipped === false) {
			$(this).toggleClass('cardFlip');
			hasBeenFlipped = true;

			// sets variable on first click
			firstClick = $(this);
			console.log(firstClick + 'clickOne');
		} else {
			$(this).toggleClass('cardFlip');
			hasBeenFlipped = false;
			// sets variable on second click
			secondClick = $(this);
			console.log(secondClick + 'clickTwo');

			// if cards are not a match cards will wait 1 sec and flip back over.
			setTimeout(doesItMatch, 1000);
		}
	});

	// function that checks if data types are the same
	const doesItMatch = function() {
		if (firstClick.attr('data-card') === secondClick.attr('data-card')) {
			console.log(`it's a match`);
		} else {
			console.log(`try again`);
			resetCardsIfNotMatch();
		}
	};

	// Resets cards if they don't match
	const resetCardsIfNotMatch = function() {
		$('.card').removeClass('cardFlip');
	};

	// play button that starts the game
	$('.playButton').on('click', function() {
		$('header').fadeOut('slow');
	});
});

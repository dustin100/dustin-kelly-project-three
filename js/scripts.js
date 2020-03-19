$(document).ready(function() {
	let firstClick = '';
	let secondClick = '';
	let hasBeenFlipped = false;
	let numOfTurns = 3;
	const cardList = $('.card');

	const handleClick = function() {
		if (hasBeenFlipped === false) {
			$(this)
				.off('click')
				.toggleClass('cardFlip');
			hasBeenFlipped = true;

			// sets variable on first click
			firstClick = $(this);
		} else {
			$(this)
				.off('click')
				.toggleClass('cardFlip');
			hasBeenFlipped = false;
			// sets variable on second click
			secondClick = $(this);

			// if cards are not a match cards will wait 1 sec and flip back over.
			setTimeout(doesItMatch, 1000);
		}
	};

	// Randomize the cards

	const Randomizer = function() {
		for (let i = 0; i < cardList.length; i++) {
			const mix = Math.floor(Math.random() * (cardList.length - 1));
			const element = cardList.splice(mix, 1);
			$('.gameBoard').append(element[0]);
		}
	};
	Randomizer();

	// on click toggles class cardFlip and gives it the card flipping effect

	$('.card').on('click', handleClick);

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
		// $('.card').removeClass('cardFlip');
		firstClick.on('click', handleClick).removeClass('cardFlip');
		secondClick.on('click', handleClick).removeClass('cardFlip');
	};

	// play button that starts the game
	$('.playButton').on('click', function() {
		$('header').fadeOut('slow');
	});
});

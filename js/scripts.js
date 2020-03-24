$(document).ready(function() {
	let cardList = $('.card');
	let firstClick;
	let secondClick;
	let hasBeenFlipped;
	let lockBoard;
	let numOfTurns;
	let isGameOver;

	const handleClick = function() {
		if (lockBoard) return;
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

			// This locks the board after the second card is flipped
			lockBoard = true;

			// if cards are not a match cards will wait 1 sec and flip back over.
			setTimeout(doesItMatch, 1000);
		}
	};

	// on click toggles class cardFlip and gives it the card flipping effect
	$('.card').on('click', handleClick);

	// Randomize the cards
	const randomizer = function(array) {
		for (let i = array.length; i > 0; i--) {
			// this gives a random number between 0  and array length
			const randomCardIndex = Math.floor(Math.random() * array.length);
			const element = array.splice(randomCardIndex, 1);
			$('.gameBoard').append(element[0]);
		}
	};

	// Counts down the number of turns left
	const takeTurn = turn => {
		turn = numOfTurns--;
		$('.turnsLeft').text(numOfTurns);
		checkTurnsLeft();
		checkEndOfGame();
	};

	// function that checks if data types are the same
	const doesItMatch = function() {
		if (firstClick.attr('data-card') === secondClick.attr('data-card')) {
			lockBoard = false;
			areAllCardsFlipped();
		} else {
			resetCardsIfNotMatch();
			takeTurn();
			lockBoard = false;
		}
	};

	// Resets cards if they don't match
	const resetCardsIfNotMatch = function() {
		firstClick.on('click', handleClick).removeClass('cardFlip');
		secondClick.on('click', handleClick).removeClass('cardFlip');
	};

	// play button that starts the game
	$('.playButton').on('click', function() {
		$('header').fadeOut('slow');
		$('.borderWrapper').fadeIn('slow');
		gameSetUp();
	});

	$('.replay').on('click', function() {
		$('.card').removeClass('cardFlip');
		$('.gameMessage').fadeOut('slow');
		$('.card')
			.off()
			.on('click', handleClick)
			.removeClass('cardFlip');
		gameSetUp();
	});

	$('.backMenu').on('click', function() {
		$('header').fadeIn('slow');
		$('.gameMessage').hide();
		$('.borderWrapper').fadeOut('slow');

		$('.card')
			.off()
			.on('click', handleClick)
			.removeClass('cardFlip');
	});

	const gameSetUp = () => {
		selectMode();
		lockBoard = false;
		isGameOver = false;
		hasBeenFlipped = false;
		randomizer(cardList);
		cardList = $('.card');
		$('.turnsLeft').text(numOfTurns);
	};

	// allows user to choose their difficulty level
	const selectMode = function(selected) {
		selected = $("input[name='difficulty']:checked").val();
		if (selected === 'easy') {
			numOfTurns = 20;
		} else if (selected === 'normal') {
			numOfTurns = 10;
		} else {
			numOfTurns = 5;
		}
	};

	// Make game winning logic

	// if all cards are flipped > game over || game turns left are zero > game over

	const checkTurnsLeft = function(turn) {
		turn = numOfTurns;
		if (turn <= 0) {
			isGameOver = true;
			$('.gameMessage').show();
			$('.statement')
				.text('You Lose')
				.css({
					color: 'red'
				});
		}
	};

	const areAllCardsFlipped = function(flipped) {
		flipped = $('.cardFlip').length;
		if (flipped === 18) {
			isGameOver = true;
			$('.gameMessage').show();
			$('.statement')
				.text('You Win')
				.css({
					color: 'green'
				});
		}
	};

	const checkEndOfGame = function() {
		checkTurnsLeft();
		areAllCardsFlipped();
	};
});

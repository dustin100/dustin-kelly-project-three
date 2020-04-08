// namespacing object
const mCardGame = {};

mCardGame.cardList = $('.card');
mCardGame.firstClick = null;
mCardGame.secondClick = null;
mCardGame.hasBeenFlipped = null;
mCardGame.lockBoard = null;
mCardGame.numOfTurns = null;
mCardGame.soundOn = true;

mCardGame.init = () => {
	// play button that starts the game
	$('.playButton').on('click', mCardGame.handlePlayButton);

	mCardGame.cardList.on('click', mCardGame.handleCardFlip);
	mCardGame.cardList.keypress('Enter', mCardGame.handleCardFlip);

	$('.replay').on('click', mCardGame.handleReplayButton);

	$('.backMenu').on('click', mCardGame.handleBackMenu);

	$('.wantSound').on('click', mCardGame.handleSoundButton);

	// Checks if user is using Chrome. If so, adds css to fix chrome bug
	(function () {
		const isChromium = !!window.chrome;
		if (isChromium === true) {
			$('.cardFront, .cardBack').css('mix-blend-mode', 'multiply');
		}
	})();
};

mCardGame.handlePlayButton = () => {
	$('header').fadeOut('slow');
	$('.borderWrapper').fadeIn('slow');
	mCardGame.gameSetUp();
	mCardGame.playSoundEffect('audio#enterLevel');
};

mCardGame.handleReplayButton = () => {
	mCardGame.cardList.removeClass('cardFlip');
	$('.gameMessage').fadeOut('slow');
	mCardGame.resetEventHandlers();
	mCardGame.gameSetUp();
	mCardGame.playSoundEffect('audio#enterLevel');
};

mCardGame.handleBackMenu = () => {
	$('header').fadeIn('slow');
	$('.gameMessage').hide();
	$('.borderWrapper').fadeOut('slow');
	mCardGame.resetEventHandlers();
	mCardGame.playSoundEffect('audio#enterLevel');
};

// toggles class cardFlip and gives it the card flipping effect
mCardGame.handleCardFlip = function () {
	if (mCardGame.lockBoard) return;
	if (mCardGame.hasBeenFlipped === false) {
		$(this).off('click').off('keypress').toggleClass('cardFlip');
		mCardGame.hasBeenFlipped = true;
		mCardGame.playSoundEffect('audio#spadeTurn');

		// sets variable on first click
		mCardGame.firstClick = $(this);
	} else {
		$(this).off('click').off('keypress').toggleClass('cardFlip');
		mCardGame.playSoundEffect('audio#spadeTurn');

		mCardGame.hasBeenFlipped = false;
		// sets variable on second click
		mCardGame.secondClick = $(this);

		// This locks the board after the second card is flipped
		mCardGame.lockBoard = true;

		// if cards are not a match cards will wait 550 ms and flip back over.
		setTimeout(mCardGame.doesItMatch, 550);
	}
};

mCardGame.resetEventHandlers = () => {
	mCardGame.cardList
		.off()
		.on('click', mCardGame.handleCardFlip)
		.keypress('Enter', mCardGame.handleCardFlip)
		.removeClass('cardFlip');
};

// Randomize the cards
mCardGame.randomizer = function (array) {
	for (let i = array.length; i > 0; i--) {
		// this gives a random number between 0  and array length
		const randomCardIndex = Math.floor(Math.random() * array.length);
		// Removes one item from the array
		const element = array.splice(randomCardIndex, 1);
		$('.gameBoard').append(element[0]);
	}
};

// Counts down the number of turns left
mCardGame.takeTurn = (turn) => {
	turn = mCardGame.numOfTurns--;
	$('.turnsLeft').text(mCardGame.numOfTurns);
	mCardGame.checkTurnsLeft();
};

// function that checks if data types are the same
mCardGame.doesItMatch = () => {
	if (
		mCardGame.firstClick.attr('data-card') ===
		mCardGame.secondClick.attr('data-card')
	) {
		mCardGame.playSoundEffect('audio#spadeMatch');
		mCardGame.lockBoard = false;
		mCardGame.areAllCardsFlipped();
	} else {
		mCardGame.resetCardsIfNotMatch();
		mCardGame.takeTurn();
		mCardGame.lockBoard = false;
	}
};

// Resets cards if they don't match
mCardGame.resetCardsIfNotMatch = () => {
	mCardGame.firstClick
		.on('click', mCardGame.handleCardFlip)
		.keypress('Enter', mCardGame.handleCardFlip)
		.removeClass('cardFlip');
	mCardGame.secondClick
		.on('click', mCardGame.handleCardFlip)
		.keypress('Enter', mCardGame.handleCardFlip)
		.removeClass('cardFlip');
};

mCardGame.gameSetUp = () => {
	mCardGame.selectMode();
	mCardGame.lockBoard = false;
	mCardGame.hasBeenFlipped = false;
	mCardGame.randomizer(mCardGame.cardList);
	// redefining cardList is required bc the randomizer is using splice
	mCardGame.cardList = $('.card');
	$('.turnsLeft').text(mCardGame.numOfTurns);
};

// allows user to choose difficulty level
mCardGame.selectMode = (selected) => {
	selected = $("input[name='difficulty']:checked").val();
	if (selected === 'easy') {
		mCardGame.numOfTurns = 20;
	} else if (selected === 'normal') {
		mCardGame.numOfTurns = 10;
	} else {
		mCardGame.numOfTurns = 6;
	}
};

//  game winning logic
// if all cards are flipped > game over || game turns left are zero > game over

// lose
mCardGame.checkTurnsLeft = (turn) => {
	turn = mCardGame.numOfTurns;
	if (turn <= 0) {
		mCardGame.endScreen('Game Over', 'red');
		mCardGame.playSoundEffect('audio#lostGame');
		mCardGame.cardList.off('keypress');
		$('.replay').focus();
	}
};

// win
mCardGame.areAllCardsFlipped = (flipped) => {
	flipped = $('.cardFlip').length;
	if (flipped === 18) {
		mCardGame.endScreen('You Win', 'green');
		mCardGame.playSoundEffect('audio#winGame');
		$('.replay').focus();
	}
};

// used to display win or lose message
mCardGame.endScreen = (text, color) => {
	$('.gameMessage').show(500);
	$('.statement').text(text).css({
		color: color,
	});
};

// Play Audio
mCardGame.playSoundEffect = (soundId) => {
	if (mCardGame.soundOn === true) {
		$(soundId)[0].currentTime = 0;
		$(soundId)[0].play();
	}
};

// Turns audio on or off
mCardGame.handleSoundButton = () => {
	if (mCardGame.soundOn === true) {
		mCardGame.soundOn = false;
		$('.wantSound').html('<i class="fas fa-volume-mute"></i>');
	} else {
		mCardGame.soundOn = true;
		$('.wantSound').html('<i class="fas fa-volume-up"></i>');
	}
};

$(function () {
	mCardGame.init();
});

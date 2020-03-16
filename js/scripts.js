$(document).ready(function() {
	const cardGameApp = {};

	cardGameApp.cards = [1, 1, 2, 2, 3, 3];

    // on click toggles class cardFlip and gives it the card flipping effect

	$('.card').on('click', function() {
		$(this).toggleClass('cardFlip');
		console.log(this);
		console.log($(this).attr('data-card'));
    });

    cardGameApp.isMatch = function() {
        if ($(this).attr('data-card') === $(this).attr('data-card')) {
            console.log('match')
        }else {
            console.log('try again')
        }
    }
    







});

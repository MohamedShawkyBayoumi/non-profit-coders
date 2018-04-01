/*
 * Create a list that holds all of your cards
 */

// This is page loader
document.addEventListener("DOMContentLoaded",function(){




// cards selecting and spread it in array to pass it to shuffle function
const cards = document.getElementsByClassName('card');
const card = [...cards];
// holding deck class of ul element in html
const deck = document.querySelector('.deck');

console.log(card);

// select restart button from the html
let restart = document.querySelector(".restart");



// this function to shuffle cards and show it in HTML file
const start = () => {
	// get rid of deck content
	deck.innerHTML = '';
	// shuffle cards and assign it to shuffledCards variable
	var shuffledCards = shuffle(card);
	// loop in cards after shuffle
	for(let newCard of shuffledCards){
		// fill deck again with cards after shuffle
		deck.appendChild(newCard);
		// remove open,show,match classes from li elements
		newCard.classList.remove("open","show","match");
		// this function to add show and open classes to cards
		var openCards = () => {
			newCard.classList.toggle("show");
			newCard.classList.toggle("open");
		}
		// click event listener to open and show cards
		newCard.addEventListener("click", openCards);
	}
}
// invoke for shuffleProcess function
start();




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
}); // end of DOMContentLoaded
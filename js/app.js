

// cards selecting and spread it in array to pass it to shuffle function
const cards = document.getElementsByClassName('card');
const card = [...cards];
// holding deck class of ul element in html
const deck = document.querySelector('.deck');

var checkOpened = [];



// set movesCounter
let movesCounter = 0;

// select moves class from html
var moves = document.querySelector('.moves');

function movesc(param){
	if(param === 'clear') {
		movesCounter = 0;
		moves.innerHTML = movesCounter;
		return;
	}else if(param === 'stop') {
		movesCounter = 0;
		return;
	}
	movesCounter++;
	moves.innerHTML = movesCounter;
	starC();
}

let starsUl = document.querySelector('.stars');
const stars = document.querySelectorAll('.star-rate');
let starArray = [...stars];



function starC (param){
	if(param==="restart"){
		starArray = [...stars];

	}
	starsUl.innerHTML = '';
	for(var x=0; x < starArray.length; x++){
		starsUl.appendChild(starArray[x]);
	}
	if(movesCounter === 2){
		starArray.splice(0,1);
	} else if (movesCounter === 28){
		starArray.splice(0,1);
	} else if (movesCounter === 40){
		starArray.splice(0,1);
	}

}


var timer = function(){
	var sec = 0;
	var min = 0;
	var timerSpan = document.querySelector('.timer');
	return function(parameter) {
		if(parameter==='stop'){
			clearInterval(time);
			sec = 0;
			min = 0;
			movesc('stop');
			starC()
			return;
		}else if (parameter==='restart'){
			sec = 0;
			min = 0;
			clearInterval(time);
			timerSpan.innerHTML = `${sec} Sec - ${min} Min`;
			movesc('clear');
			starC()
		}
		return time = setInterval(function(){
			timerSpan.innerHTML = `${sec} Sec - ${min} Min`;
			sec++;
			if(sec == 60){
				min++;
				sec=0;
			} else if (min == 60){
				hour++;
				min=0;
			}
		},1000);
	}
}();


// this function to shuffle cards and show it in HTML file
var start = () => {
	// get rid of deck content
	deck.innerHTML = '';
	// shuffle cards and assign it to shuffledCards variable
	var shuffledCards = shuffle(card);
	// loop in cards after shuffle
	for(var newCard of shuffledCards){
		// fill deck again with cards after shuffle
		deck.appendChild(newCard);
		// remove open,show,match classes from li elements
		newCard.classList.remove("open","show","match");

		// click event listener to open and show cards
		newCard.addEventListener("click", openCards);
	}
};
// invoke for shuffleProcess function
start();

// select restart button from the html
var restart = document.querySelector(".restart");
restart.addEventListener('click', restartGame);
function restartGame(){
	start();
	timer('restart');
	starC('restart');
}




let clickFlag = true; // need to react on clicks or ignore it
let timerFlag = true;
function openCards(){
    if(!clickFlag){return;} // ignore all clicks while not true
	if(timerFlag){
		timer();
		timerFlag = false;
	}
    this.classList.toggle("show");
    this.classList.toggle("open");
    // push the clicked card to the checkOpened array
    checkOpened.push(this);
    // check if the user open the first card to leave it opened
    this.removeEventListener('click',openCards); // remove click event for 1st and 2nd click

  if (checkOpened.length == 2){ // if we have two clicks we need to check them
      clickFlag = false; // but first we need to ignore all other clicks with this line
    setTimeout(function(){ // we need to set timeout because first we need that animation occurred
    	movesc();

        if(checkOpened[0].innerHTML === checkOpened[1].innerHTML){ // start our check
            checkOpened[0].classList.add('match');
            checkOpened[1].classList.add('match');
            checkOpened = [];
        } else { // if mismatch
            setTimeout(function(){
            checkOpened[0].classList.remove('open');
            checkOpened[1].classList.remove('open');
            checkOpened[0].classList.remove('show');
            checkOpened[1].classList.remove('show');
            checkOpened[0].addEventListener("click", openCards); // return click event on
            checkOpened[1].addEventListener("click", openCards); // return click event on
            checkOpened = [];
            },0);
        }
    clickFlag = true; // now at the end of animation we can allow another clicks
	// get match classes after addition to elements
	var matchedCards = document.querySelectorAll('.match');
	if(matchedCards.length == 16){
		timer('stop');
		win();
	}
    }, 500)
  }


}

function win(){
	var modal = document.querySelector('.modal');
	var starsRes = document.querySelector('.starsRes');
	if (starArray.length > 0){
		for(var x=0; x < starArray.length; x++){
			starsRes.appendChild(starArray[x]);
		}
	}else{
		starsRes.innerHTML = '0';
	}
	var movesRes = document.querySelector('.movesRes');
	movesRes.innerHTML = moves.innerHTML;
	var timeRes = document.querySelector('.timeRes');
	timeRes.innerHTML = document.querySelector('.timer').innerHTML;

	modal.style.display = 'block';

	modal.addEventListener('click',function(){
		modal.style.display = 'none';
		restartGame();
	});
}

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



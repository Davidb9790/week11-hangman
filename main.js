var prompt = require('prompt');

//get from the word file
var word = require('./word.js')

prompt.start();
game = {
	wordBank :["honda", "nissan","lamborghini", "ferrari","bugatti"],
	chancesLeft : 11, // per word
	currentWrd : null, //the word object
	startGame : function(wrd){
		//have to make sure the user has 11 guesses
		this.resetGuessesRemaining();
		//need to get random word from array

		//since it has to choose a random word it uses the random number and applies it to which index of the array.
		this.currentWrd = new word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
		this.keepPromtingUser();
	},
	resetGuessesRemaining : function(){
		this.chancesLeft = 11;
	},
	keepPromtingUser : function(){
		var self = this;
		prompt.get(['guessLetter'], function(err, result){
			//result is an object like {guessLetter :'f'}
			//console.log(result);

			console.log('The Letter you guessed is: ' + result.guessLetter);
			//this checks if the letter was found and if it is then it sets that specific letter in the word to be found
			var amountUserGuess = self.currentWrd.checkIfLetterFound(result.guessLetter);
			//if the user guessed incorrectlyminus the number of guesses left
			if (amountUserGuess == 0) {
				console.log('Incorrect Guess buddy');
				self.chancesLeft--;
				} else{
					console.log('You are on the right track');
					//check if you win only when you are right
					if (self.currentWrd.didWeFindTheWord()) {
						console.log('You Won champ');
						return;
					}
				}
				console.log('Guesses remanining :', self.chancesLeft);
				console.log(self.currentWrd.wordRender());
				console.log('Here are the letters you already guessed :');
				
				if ((self.chancesLeft > 0) && (self.currentWrd.found == false)){
					self.keepPromtingUser();
				}else if (self.chancesLeft == 0){
					console.log('You couldnt guess right, so heres the word :' + self.currentWrd.word);
					console.log('Get your head in the game');
				}else{
					console.log(self.currentWrd.wordRender());
				}
			});
		}
	}
}
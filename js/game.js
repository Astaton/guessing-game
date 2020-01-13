class Game {
    constructor(num){
        this.secretNumber = num;
        this.guessesUsed = 0;
        this.promptHint = 0;
        this.lastGuess = 0;
        this.won = false;
        this.guessesRemainingPrompts = ['You have 5 guesses remaining', 'You have 4 guesses remaining', 'You still have 3 guesses remaining', 'You only have 2 guesses left', 'You have 1 last guess left'];
        this.howClose = ['you\'re nowhere close.', 'you might need more guesses...', 'you might just get this one!', 'you\'re almost there.', 'you\'ve got this!'];
        this.hint = `The number is between ${Math.ceil(Math.random() * this.secretNumber)} and ${Math.ceil( (Math.random() * (100 - this.secretNumber)) + this.secretNumber)}`;
    }

    updatePromptText() {
        let promptText = document.querySelector('#promptText');
        promptText.innerText = `${this.guessesRemainingPrompts[this.guessesUsed]}, ${this.howClose[this.promptHint]}`;
        return this;
    }

    guessTheNumber(number) {
        this.guessesUsed++;
        this.lastGuess = number;
        this.won = this.secretNumber === this.lastGuess ? true : false;
        this.completeCheck();
        const howFarOff = Math.abs(this.lastGuess - this.secretNumber);
        if (howFarOff >= 50){
            this.promptHint = 0;
        }
        if (howFarOff < 50 && howFarOff >= 35){
            this.promptHint = 1;
        }
        if (howFarOff < 35 && howFarOff >= 20){
            this.promptHint = 2;
        }
        if (howFarOff < 20 && howFarOff >= 10){
            this.promptHint = 3;
        }
        if (howFarOff < 10){
            this.promptHint = 4;
        }
        console.log(this);
        return this;
    }

    completeCheck() {
        console.log('completeCheck');
    }

    updatePreviousGuessLog() {
        const previousGuessLog = document.querySelector('#previous_guess_list');
        const latestGuess = document.createElement('li');
        latestGuess.innerText = this.lastGuess;
        previousGuessLog.append(latestGuess);
    }

    getHint() {
        const infoPopElem = document.getElementById('infoPop');
        const infoPopText = document.getElementById('infoPop__text');
        console.log(infoPopElem.className);
        if (infoPopElem.className === 'infoPop--hidden') {
            infoPopText.innerText = this.hint;
            infoPopElem.className = 'infoPop--visible';
            setTimeout( function(){
                infoPopText.innerText = '';
                infoPopElem.className = 'infoPop--hidden';
            }, 3750);
        }
        return this.hint;
    }

    guessNotANumber() {
        const infoPopElem = document.getElementById('infoPop');
        const infoPopText = document.getElementById('infoPop__text');
        console.log(infoPopElem.className);
        if (infoPopElem.className === 'infoPop--hidden') {
            infoPopText.innerText = 'Please enter a number 1 - 100.';
            infoPopElem.className = 'infoPop--visible';
            setTimeout( function(){
                infoPopText.innerText = '';
                infoPopElem.className = 'infoPop--hidden';
            }, 3250);
        }
    }

}

let theGame;

const submitGuessElement = document.querySelector('#submitGuess');

submitGuessElement.addEventListener('click', function(){
    const guessInputElement = document.querySelector('#guessSubmitted');
    const numberSubmitted = parseInt(guessInputElement.value, 10);
    guessInputElement.value = '';
    if (Number.isNaN(numberSubmitted) || numberSubmitted < 1 || numberSubmitted > 100){
        theGame.guessNotANumber();
        return
    }
    theGame.guessTheNumber(numberSubmitted);

    theGame.updatePromptText();
    theGame.updatePreviousGuessLog();
    if (theGame.won) {
        console.log('Yov\'ve won. Congratulations!!');
    }
});

const hintButton = document.querySelector('#getHint');

hintButton.addEventListener('click', function(){
    console.log(theGame.getHint());
});

const playAgainButton = document.querySelector('#playAgain');

playAgainButton.addEventListener('click', function(){
    const guessListElem = document.getElementById('previous_guess_list');
    startNewGame();
});

function startNewGame() {
    theGame = new Game(Math.ceil(Math.random() * 100));
    console.log(theGame);
}

function onLoad() {
    startNewGame();
}

onLoad();

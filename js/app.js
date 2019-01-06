/*
Game Rules:
- Player must guess a number between a min and max value
- Player gets a certain amount of guess 
- Notify player about remaining guesses
- Notify player about the correct answer if loose 
- Let player choose to play again
*/

// UI Variables 
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessButton = document.querySelector('#guessBtn');
const guessInput = document.querySelector('#input');
const message = document.querySelector('.message');


// Game values
let min = 1,
    max = 10,
    winningNumber = getWinningNumber(min, max),
    guessLeft = 3;

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again Event Listener 
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
})

// Event Listeners 
guessButton.addEventListener('click', function () {
    let guessNumber = parseInt(guessInput.value);

    // Checking
    if (isNaN(guessNumber) || guessNumber < min || guessNumber > max) {
        setMessage(`Please Enter a number between ${min} and ${max}`, 'red');
    } else {
        // Check if won 
        if (guessNumber === winningNumber) {
            gameOver(true, `${winningNumber} is the correct, YOU WIN!`)
        } else {
            // wrong number 
            guessLeft -= 1;
            if (guessLeft === 0) {
                // Game over - lost 
                gameOver(false, `Game over, You lost! The correct number was ${winningNumber} `)

            } else {
                // Game continues, answer wrong 

                // focus input field 
                guessInput.focus();
                setMessage(`${guessNumber} is not correct, ${guessLeft} guess left`, 'red');
                guessInput.value = '';
            }
        }
    }
});

// Game Over 
function gameOver(wonOrNot, msg) {
    let color;
    wonOrNot === true ? color = 'green' : color = 'red';
    // Disable input 
    guessInput.disabled = 'true';
    // Change border color 
    guessInput.style.borderColor = color;
    // Change text Color 
    message.style.color = color;
    // set message
    setMessage(msg);
    // play Again 
    guessButton.value = 'Play Again';
    guessButton.className += 'play-again';


}

// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

// Get winning Number 
function getWinningNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
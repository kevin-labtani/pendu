class Hangman {
  constructor(word, remainingGuesses, guessedLetters) {
    this.word = word.toLowerCase().split("");
    this.remainingGuesses = remainingGuesses;
    this.guessedLetters = guessedLetters
      ? guessedLetters.toLowerCase().split("")
      : [];
    this.status = "playing";
    this.puzzle = "";
  }
  // create puzzle
  getPuzzle() {
    let puzzle = "";
    this.word.forEach((letter, index) => {
      puzzle += this.guessedLetters.indexOf(letter) > -1 ? letter : "*";
    });
    this.puzzle = puzzle;
    return puzzle;
  }
  // make a guess, check it's unique and if it's correct
  guessLetter(rawGuess) {
    const guess = rawGuess.toLowerCase();
    const isUnique = !this.guessedLetters.includes(guess);
    const isBadGuess = !this.word.includes(guess);
    const regex = /^[a-z]{1}$/;
    // stop if status isn't "playing"
    // return nothing which is undefined, which will stop the game from running
    if (this.status !== "playing") {
      return;
    }

    if (isUnique && regex.test(guess)) {
      this.guessedLetters.push(guess);
    }

    if (isUnique && isBadGuess && regex.test(guess)) {
      this.remainingGuesses--;
    }
  }
  // calculate status of the game
  calculateStatus() {
    if (!this.puzzle.includes("*")) {
      this.status = "finished";
    } else {
      this.status = "playing";
    }
    if (!this.remainingGuesses) {
      this.status = "failed";
    }
  }

  // generate a message with the status of the game
  messageStatus(remainingGuesses) {
    if (this.status === "finished") {
      return "Congrats! You've won!";
    } else if (this.status === "playing") {
      return `Guesses remaining: ${this.remainingGuesses}`;
    } else if (this.status === "failed") {
      return `You've lost! The word was: ${this.word.join("")}`;
    }
  }
}

#! /usr/bin/env node
import inquirer from 'inquirer';

const words = ['typescript', 'inquirer', 'hangman', 'programming', 'development', "javascript", "html", "css", "python"];

const shuffleWord = (word: string): string => {
  const letters = word.split('');
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join('');
};

const startGame = async () => {
  let score = 0;
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const scrambledWord = shuffleWord(word);

    const answer = await inquirer.prompt({
      type: 'input',
      name: 'guess',
      message: `Unscramble the word: ${scrambledWord}`
    });

    if (answer.guess.toLowerCase() === word.toLowerCase()) {
      console.log('Correct!');
      score++;
    } else {
      console.log(`Wrong! The correct word was ${word}.`);
    }
    console.log();
  }

  console.log(`Your final score is ${score} out of ${words.length}.`);

  const playAgain = await inquirer.prompt({
    type: 'confirm',
    name: 'again',
    message: 'Do you want to play again?'
  });

  if (playAgain.again) {
    startGame();
  } else {
    console.log('Thanks for playing!');
  }
};

startGame();

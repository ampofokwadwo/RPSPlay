const choices = document.querySelectorAll(".choice");
const resultText = document.getElementById("result-text");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const resetBtn = document.getElementById("reset");
const playerChoiceEl = document.getElementById("player-choice");
const computerChoiceEl = document.getElementById("computer-choice");

let playerScore = 0;
let computerScore = 0;
let isPlaying = false;

// Emoji Mapping
const emojiMap = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️"
};

// Sound Effects
const sounds = {
  click: new Audio("./assets/sounds/mouseclicksoundeffectmp356738 Ringtone.mp3"),
  lose: new Audio("./assets/sounds/arcade_retro_game_over_sound_effect_hd_mp3_45206.mp3"),
  win: new Audio("./assets/sounds/8-bit_victory_winner_retro_style_game_sound_effect_mp3_45235.mp3"),
};

// Sound utility
function playSound(type) {
  const sound = sounds[type];
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

// Random computer choice
function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

// Score highlight
function highlight(el) {
  el.classList.add("highlight");
  setTimeout(() => el.classList.remove("highlight"), 500);
}

// Update scoreboard text
function updateScores() {
  playerScoreEl.textContent = `You: ${playerScore}`;
  computerScoreEl.textContent = `Computer: ${computerScore}`;
}

// Show game result text
function displayResult(msg, outcome) {
  resultText.textContent = msg;
  resultText.className = "";
  resultText.classList.add(`result-${outcome}`);
}

// Game logic
function playRound(playerChoice) {
  if (isPlaying) return;
  isPlaying = true;

  playSound("click");

  const computerChoice = getComputerChoice();
  playerChoiceEl.textContent = "⏳";
  computerChoiceEl.textContent = "⏳";
  resultText.textContent = "Revealing...";

  setTimeout(() => {
    playerChoiceEl.textContent = emojiMap[playerChoice];
    computerChoiceEl.textContent = emojiMap[computerChoice];

    let result, outcome;

    if (playerChoice === computerChoice) {
      result = `Draw! You both chose ${playerChoice}.`;
      outcome = "draw";
      playSound("draw");
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      result = `You win! ${playerChoice} beats ${computerChoice}.`;
      playerScore++;
      outcome = "win";
      highlight(playerScoreEl);
      playSound("win");
    } else {
      result = `You lose! ${computerChoice} beats ${playerChoice}.`;
      computerScore++;
      outcome = "lose";
      highlight(computerScoreEl);
      playSound("lose");
    }

    updateScores();
    displayResult(result, outcome);
    isPlaying = false;
  }, 800);
}

// Choice button events
choices.forEach(btn => {
  btn.addEventListener("click", () => {
    playRound(btn.dataset.choice);
  });
});

// Reset button
resetBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  updateScores();
  playerChoiceEl.textContent = "🤔";
  computerChoiceEl.textContent = "🤖";
  resultText.textContent = "Make your move!";
  resultText.className = "";
});
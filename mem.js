// To Create Random colors

// Splash Screen Handle
const startBtn = document.querySelector("nav span");
const input = document.querySelector("nav input");
const playerName = document.querySelector(".name span");

startBtn.addEventListener("click", startGame);
function startGame() {
   if (input.value == "" || input.value == null) {
      playerName.innerText = "No name!";
   } else {
      playerName.innerText = input.value;
   }
   startBtn.parentElement.remove();
}

// Add colors & order property to blocks
const container = document.querySelector(".memory-game-blocks");
const blocks = Array.from(container.children);
const orderValues = [...blocks[index]];
console.log(orderValues);
// Flip block function

// Stop clicking

// Check Matching blocks

// Shuffle Array

// win scenario

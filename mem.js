// To Create Random colors
// prettier-ignore
let clrsArr = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","f",];

// Splash Screen Handle
const startBtn = document.querySelector("nav span");
const inputName = document.querySelector("nav input");
const triesElement = document.querySelector(".tries span");
const successSfx = document.getElementById("success");
const failSfx = document.getElementById("fail");
const endSfx = document.getElementById("end-game");

startBtn.onclick = function () {
   if (inputName.value == null || inputName.value == "") {
      document.querySelector(".name span").innerText = "Mr. No-name";
   } else {
      document.querySelector(".name span").innerText = inputName.value;
   }
   document.querySelector("nav").remove();
};

let duration = 1000;
let counter = 0;
const blocksContainer = document.querySelector(".memory-game-blocks");
const blocks = Array.from(blocksContainer.children);

let orderRange = [...blocks.keys()];
shuffle(orderRange);

// Add order property to blocks
blocks.forEach((b, index) => {
   let clr = "#";
   for (let i = 0; i < 6; i++) {
      clr += clrsArr[Math.floor(Math.random() * clrsArr.length)];
   }
   b.style.order = orderRange[index];
   b.style.color = clr;
   b.addEventListener("click", function () {
      flipBlock(b);
   });
});

// Flip block function
function flipBlock(selectedBlock) {
   selectedBlock.classList.add("flipped");
   let allFlippedBlocks = blocks.filter((flippedBlock) =>
      flippedBlock.classList.contains("flipped")
   );

   if (allFlippedBlocks.length === 2) {
      // Check 2 blocks only

      stopClicking();
      checkMatches(allFlippedBlocks[0], allFlippedBlocks[1]);
   }
}

// Stop clicking
function stopClicking() {
   blocksContainer.classList.add("no-clicking");
   setTimeout(() => {
      blocksContainer.classList.remove("no-clicking");
   }, duration);
}

// Check Matching blocks
function checkMatches(firstBlock, secondBlock) {
   if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
      firstBlock.classList.remove("flipped");
      secondBlock.classList.remove("flipped");
      firstBlock.classList.add("has-match");
      secondBlock.classList.add("has-match");
      successSfx.play();
      counter++;
      console.log(counter);
      if (counter === blocks.length / 2) {
         wining();
      }
   } else {
      triesElement.innerText = parseInt(triesElement.innerText) + 1;
      setTimeout(() => {
         firstBlock.classList.remove("flipped");
         secondBlock.classList.remove("flipped");
      }, duration);
      failSfx.play();
   }
}

// Shuffle Array
function shuffle(array) {
   let current = array.length;
   let random;
   let temp;

   while (current > 0) {
      random = Math.floor(Math.random() * current);
      current--;
      temp = array[current];
      array[current] = array[random];
      array[random] = temp;
   }
   return array;
}

// win scenario
function wining() {
   endSfx.play();
   let inter = setInterval(() => {
      blocks.forEach((bl) => {
         bl.classList.toggle("has-match");
      });
   }, 150);
   setTimeout(() => {
      clearInterval(inter);
   }, 1500);
}

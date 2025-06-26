var images = ['puzzle-image.jpg'];
var currentIndex = 0;
var totalClicks = 0;
var messages = [
  "You're amazing! 💖",
  "Perfect match! 💕",
  "Love is in the air! 💝",
  "You're a puzzle master! 💗",
  "Made with love! 💓",
  "You're incredible! 💘",
  "Love wins! 💞",
  "You're a star! ⭐️💖"
];

function createHeart() {
  const heart = document.createElement('div');
  heart.innerHTML = '❤️';
  heart.className = 'heart';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
  heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.style.opacity = '0';
    setTimeout(() => heart.remove(), 500);
  }, 4500);
}

function showCompletionMessage() {
  const message = document.createElement('div');
  message.className = 'completion-message';
  message.textContent = messages[Math.floor(Math.random() * messages.length)];
  document.body.appendChild(message);
  
  // Create extra hearts for celebration
  for(let i = 0; i < 10; i++) {
    setTimeout(() => {
      createHeart();
    }, i * 200);
  }
  
  setTimeout(() => {
    message.style.opacity = '0';
    setTimeout(() => message.remove(), 500);
  }, 2000);
}

function startHeartAnimation() {
  setInterval(createHeart, 400);
}

function randomizeImage() {
  let root = document.documentElement;
  root.style.setProperty('--image', 'url(' + images[currentIndex] + ')');
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  
  // Get viewport dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const pieceSize = 100; // Size of each puzzle piece
  const margin = 20; // Margin from edges
  
  // Calculate safe area for pieces
  const safeWidth = viewportWidth - (pieceSize + margin * 2);
  const safeHeight = viewportHeight - (pieceSize + margin * 2);
  
  // Create a grid of possible positions
  const gridSize = 3; // 3x3 grid
  const cellWidth = safeWidth / gridSize;
  const cellHeight = safeHeight / gridSize;
  
  var puzzleItems = document.querySelectorAll('#puzz i');
  for (var i = 0; i < puzzleItems.length; i++) {
    // Calculate position within the safe area
    const gridX = i % gridSize;
    const gridY = Math.floor(i / gridSize);
    
    // Add some randomness within each grid cell
    const randomX = Math.random() * (cellWidth * 0.5);
    const randomY = Math.random() * (cellHeight * 0.5);
    
    const x = margin + (gridX * cellWidth) + randomX;
    const y = margin + (gridY * cellHeight) + randomY;
    
    // Apply the position with smooth animation
    puzzleItems[i].style.transform = 'translate(0, 0)';
    puzzleItems[i].style.transition = 'none';
    requestAnimationFrame(() => {
      puzzleItems[i].style.left = x + 'px';
      puzzleItems[i].style.top = y + 'px';
      puzzleItems[i].style.transform = 'translate(0, 0) rotate(' + (Math.random() * 20 - 10) + 'deg)';
      puzzleItems[i].style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  }
}

// Add window resize handler to reposition pieces when window is resized
window.addEventListener('resize', () => {
  randomizeImage();
});

randomizeImage();
startHeartAnimation();

function reloadPuzzle() {
  var doneItems = document.querySelectorAll('.done');
  doneItems.forEach(function (element) {
    element.classList.toggle('done');
  });
  var droppedItems = document.querySelectorAll('.dropped');
  droppedItems.forEach(function (element) {
    element.classList.toggle('dropped');
  });
  var allDoneElement = document.querySelector('.allDone');
  if (allDoneElement) {
    allDoneElement.style = '';
    allDoneElement.classList.toggle('allDone');
  }
}

// mobile functionality
var puzzleItemsMobile = document.querySelectorAll('#puzz i');
puzzleItemsMobile.forEach(function (element) {
  element.addEventListener('mousedown', function () {
    totalClicks++;
    document.querySelector('#clicks').innerHTML = totalClicks;
  });
  element.addEventListener('click', function () {
    if (document.querySelector('.clicked')) {
      document.querySelector('.clicked').classList.toggle('clicked');
      element.classList.toggle('clicked');
    } else {
      element.classList.toggle('clicked');
    }
  });
});

var puzzleItemsDesktop = document.querySelectorAll('#puz i');
puzzleItemsDesktop.forEach(function (element) {
  element.addEventListener('click', function () {
    if (document.querySelector('.clicked')) {
      var clickedElement = document.querySelector('.clicked');
      if (clickedElement.classList.contains(element.classList)) {
        element.classList.add('dropped');
        clickedElement.classList.add('done');
        clickedElement.classList.toggle('clicked');

        if (document.querySelectorAll('.dropped').length == 9) {
          document.querySelector('#puz').classList.add('allDone');
          document.querySelector('#puz').style.border = 'none';
          document.querySelector('#puz').style.animation = 'allDone 1s linear forwards';

          setTimeout(function () {
            reloadPuzzle();
            randomizeImage();
          }, 1500);
        }
      }
    }
  });
});

// desktop drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.className);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  if (ev.target.className == data) {
    ev.target.classList.add('dropped');
    const draggedElement = document.querySelector('.' + data + "[draggable='true']");
    draggedElement.classList.add('done');

    if (document.querySelectorAll('.dropped').length == 9) {
      document.querySelector('#puz').classList.add('allDone');
      document.querySelector('#puz').style.border = 'none';
      document.querySelector('#puz').style.animation = 'allDone 2s cubic-bezier(0.4, 0, 0.2, 1) forwards';
      showCompletionMessage();

      setTimeout(function () {
        reloadPuzzle();
        randomizeImage();
      }, 2500);
    }
  }
}
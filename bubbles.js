document.addEventListener('DOMContentLoaded', function () {
  const cursorGlow = document.createElement('div');
  cursorGlow.classList.add('cursor-glow');
  document.body.appendChild(cursorGlow);

  const bubbleColors = ['#64ffda', '#00e676', '#76ff03'];
  const bubbleSpeed = 0.1; // Speed at which bubbles move (percentage of screen width per frame)
  const bubbleSpawnRate = 200; // Interval for spawning new bubbles (milliseconds)
  const initialBubbleCount = 50; // Initial number of bubbles to spawn

  let lastMouseX = window.innerWidth / 2;
  let lastMouseY = window.innerHeight / 2;

  // Function to spawn a single bubble
  function spawnBubble(initial = false) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.backgroundColor = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
    bubble.style.width = `${Math.random() * 15 + 5}px`; 
    bubble.style.height = bubble.style.width;

    if (initial) {
      bubble.style.left = `${Math.random() * 200 - 100}%`; 
      bubble.style.top = `${Math.random() * 100}%`;
    } else {
      bubble.style.left = `${Math.random() * 200 - 100}%`;
      bubble.style.top = '-10%';
    }

    bubble.dataset.originalLeft = bubble.style.left;
    bubble.dataset.originalTop = bubble.style.top;

    background.appendChild(bubble);
    moveBubble(bubble);
  }

  // Spawn initial set of bubbles
  for (let i = 0; i < initialBubbleCount; i++) {
    spawnBubble(true);
  }

  setInterval(spawnBubble, bubbleSpawnRate);

  function moveBubble(bubble) {
    let x = parseFloat(bubble.dataset.originalLeft);
    let y = parseFloat(bubble.dataset.originalTop);

    const moveInterval = setInterval(() => {
      if (y > 110) { // If bubble is below the viewport, remove it
        clearInterval(moveInterval);
        bubble.remove();
      } else {
        x += bubbleSpeed;
        y += bubbleSpeed;
        bubble.dataset.originalLeft = `${x}%`;
        bubble.dataset.originalTop = `${y}%`;
        bubble.style.left = `${x}%`;
        bubble.style.top = `${y}%`;
      }
    }, 16);
  }

  document.addEventListener('mousemove', function (e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    cursorGlow.style.left = `${mouseX}px`;
    cursorGlow.style.top = `${mouseY}px`;
  });

  setInterval(() => {
    updateBubbleGlow(lastMouseX, lastMouseY);
  }, 16);
});
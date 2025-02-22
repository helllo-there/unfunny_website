document.addEventListener('DOMContentLoaded', () => {
  const background = document.getElementById('background');

  // Detect logical processors
  const lowEndDevice = navigator.hardwareConcurrency <= 2;
  if (lowEndDevice) return; // Disable bubbles on low-end devices

  const bubbleColors = ['#64ffda', '#00e676', '#76ff03'];
  const bubbleSpeed = 0.1; // Movement speed
  const bubbleSpawnRate = 200; // Time between spawns (ms)
  const initialBubbleCount = 50; // Initial bubbles on load

  // Function to spawn bubbles from either the top or left
  function spawnBubble(initial = false) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.backgroundColor = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];

    // Random size between 5px and 20px
    const size = Math.random() * 15 + 5;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Randomly spawn from top or left
    const spawnFromTop = Math.random() < 0.5;

    if (initial) {
      // Initial bubbles: spawn randomly anywhere
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.top = `${Math.random() * 100}%`;
    } else if (spawnFromTop) {
      // Spawn from top
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.top = '-10%';
    } else {
      // Spawn from left
      bubble.style.left = '-10%';
      bubble.style.top = `${Math.random() * 100}%`;
    }

    background.appendChild(bubble);
    moveBubble(bubble, spawnFromTop);
  }

  // Initial bubbles
  for (let i = 0; i < initialBubbleCount; i++) {
    spawnBubble(true);
  }

  setInterval(spawnBubble, bubbleSpawnRate);

  // Moves bubbles diagonally across the screen
  function moveBubble(bubble, fromTop) {
    let x = parseFloat(bubble.style.left);
    let y = parseFloat(bubble.style.top);

    const moveInterval = setInterval(() => {
      if (x > 110 || y > 110) {
        // Remove bubble when it goes off-screen
        clearInterval(moveInterval);
        bubble.remove();
      } else {
        // Move diagonally depending on spawn side
        x += bubbleSpeed;
        y += bubbleSpeed;
        bubble.style.left = `${x}%`;
        bubble.style.top = `${y}%`;
      }
    }, 16); // Approx. 60fps
  }
});

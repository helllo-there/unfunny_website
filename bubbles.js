document.addEventListener('DOMContentLoaded', function () {
  const cursorGlow = document.createElement('div');
  cursorGlow.classList.add('cursor-glow');
  document.body.appendChild(cursorGlow); // Append to body instead of background

  const bubbleColors = ['#64ffda', '#00e676', '#76ff03'];
  const bubbleSpeed = 0.1; // Speed at which bubbles move (percentage of screen width per frame)
  const bubbleSpawnRate = 200; // Interval for spawning new bubbles (milliseconds)
  const initialBubbleCount = 50; // Initial number of bubbles to spawn
  const glowRadius = 150; // Radius for glow effect around cursor
  const bubbleForce = 40; // Force applied to bubbles on click
  const mouseShiftIntensity = 0.05; // Intensity of bubble shift in response to mouse movement

  let lastMouseX = window.innerWidth / 2;
  let lastMouseY = window.innerHeight / 2;

  // Function to spawn a single bubble
  function spawnBubble(initial = false) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.backgroundColor = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
    bubble.style.width = `${Math.random() * 15 + 5}px`; // smaller maximum bubble size
    bubble.style.height = bubble.style.width;

    if (initial) {
      // Random position within the viewport, with some allowed to start off the left edge
      bubble.style.left = `${Math.random() * 200 - 100}%`; // -100% to 100% for x position
      bubble.style.top = `${Math.random() * 100}%`;
    } else {
      // Allow bubbles to spawn beyond left edge
      bubble.style.left = `${Math.random() * 200 - 100}%`;
      bubble.style.top = '-10%'; // Start above the viewport
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

  // Continuously spawn new bubbles
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

  function applyMouseShift(shiftX, shiftY) {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
      const currentTransform = bubble.style.transform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/);
      let currentX = 0, currentY = 0;
      if (currentTransform) {
        currentX = parseFloat(currentTransform[1]);
        currentY = parseFloat(currentTransform[2]);
      }
      bubble.style.transform = `translate(${currentX + shiftX}px, ${currentY + shiftY}px)`;
    });
  }

  function updateBubbleGlow(mouseX, mouseY) {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
      const rect = bubble.getBoundingClientRect();
      const bubbleX = rect.left + rect.width / 2;
      const bubbleY = rect.top + rect.height / 2;

      const dx = bubbleX - mouseX;
      const dy = bubbleY - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < glowRadius) {
        bubble.style.boxShadow = `0 0 10px 5px white`; // Glow white
      } else {
        bubble.style.boxShadow = 'none'; // No glow if outside the range
      }
    });
  }

  document.addEventListener('mousemove', function (e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    cursorGlow.style.left = `${mouseX}px`;
    cursorGlow.style.top = `${mouseY}px`;

    const shiftX = (mouseX - lastMouseX) * mouseShiftIntensity;
    const shiftY = (mouseY - lastMouseY) * mouseShiftIntensity;

    applyMouseShift(shiftX, shiftY);

    lastMouseX = mouseX;
    lastMouseY = mouseY;

    updateBubbleGlow(mouseX, mouseY);
  });

  document.addEventListener('click', function (e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
      const rect = bubble.getBoundingClientRect();
      const bubbleX = rect.left + rect.width / 2;
      const bubbleY = rect.top + rect.height / 2;

      const dx = bubbleX - mouseX;
      const dy = bubbleY - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < glowRadius) { // Use glowRadius to determine radius affected by click
        const angle = Math.atan2(dy, dx);

        const newX = bubbleX + Math.cos(angle) * bubbleForce;
        const newY = bubbleY + Math.sin(angle) * bubbleForce;

        bubble.style.transition = 'transform 0.25s ease'; // quickly shift away
        bubble.style.transform = `translate(${newX - bubbleX}px, ${newY - bubbleY}px)`;

        setTimeout(() => {
          bubble.style.transition = 'transform 0.5s ease 0.05s'; // wait 0.05s
          bubble.style.transform = 'none';
        }, 250);

        setTimeout(() => {
          bubble.style.transition = 'transform 0.25s ease-in-out'; // shift back to original position
          bubble.style.transform = 'none';
        }, 500);
      }
    });
  });

  // Continuously update the glow state of the bubbles
  setInterval(() => {
    updateBubbleGlow(lastMouseX, lastMouseY);
  }, 16);
});

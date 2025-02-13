const image = document.getElementById("flash-image");
const audioLebron = new Audio("images/you_are_my_sunshine.mp3");

function flashImage(img) {
  img.style.opacity = "1"; // Make image appear quickly
  setTimeout(() => {
    img.style.transition = "opacity 0.4s"; // Fade out effect
    img.style.opacity = "0";
    setTimeout(() => {
      img.style.display = "none"; // Completely hide the image
      if (img === image) {
        audioLebron.pause(); // Stop lebron_sun audio when image is completely invisible
      }
      flashRandomly(); // Call flashRandomly to start next flash
    }, 400); // Hide image after 0.35 seconds
  }, 10); // Start fading out after 10 milliseconds
}

function flashRandomly() {
  const randomTime = getRandomInt(60) * 1000;
  setTimeout(() => {
    image.style.display = "block"; // Show lebron_sun.png
    flashImage(image);
    audioLebron.play(); // Play lebron_sun audio
  }, randomTime);
}

flashRandomly(); // Start the loop

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const image = document.getElementById("flash-image");
const audioLebron = new Audio("files/vineboom.mp3");

function flashImage(img) {
  img.style.opacity = "1";
  setTimeout(() => {
    img.style.transition = "opacity 0.4s";
    img.style.opacity = "0";
    setTimeout(() => {
      img.style.display = "none";
      flashRandomly(); // Continue flashing regardless of audio state
    }, 400); // Hide image after 0.4 seconds
  }, 10); // Start fading out after 10 milliseconds
}

function flashRandomly() {
  const randomTime = getRandomInt(60) * 10000;
  setTimeout(() => {
    image.style.display = "block";
    flashImage(image);
    audioLebron.currentTime = 0; // Restart audio from the beginning
    audioLebron.play();
  }, randomTime);
}

flashRandomly(); // Start the loop

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

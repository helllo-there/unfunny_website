const image = document.getElementById("flash-image");
const audioLebron = new Audio("images/vineboom.mp3");

function flashImage(img) {
  img.style.opacity = "1";
  setTimeout(() => {
    img.style.transition = "opacity 0.4s";
    img.style.opacity = "0";
    setTimeout(() => {
      img.style.display = "none";
      if (img === image) {
        audioLebron.pause();
      }
      flashRandomly();
    }, 400); // Hide image after 0.35 seconds
  }, 10); // Start fading out after 10 milliseconds
}

function flashRandomly() {
  const randomTime = getRandomInt(60) * 10000;
  setTimeout(() => {
    image.style.display = "block";
    flashImage(image);
    audioLebron.play();
  }, randomTime);
}

flashRandomly(); // Start the loop

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

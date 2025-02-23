document.addEventListener("scroll", () => {
  const body = document.body;
  const html = document.documentElement;

  const scrollTop = window.pageYOffset || html.scrollTop || body.scrollTop;
  const scrollHeight = html.scrollHeight - html.clientHeight;
  const scrollPercent = scrollTop / scrollHeight;

  // Start & End color
  const startColor = [0, 67, 191]; // #0043bf
  const endColor = [22, 0, 56];   // #160038

  // Scrolling page color calc
  const interpolatedColor = startColor.map((start, i) => {
    return Math.round(start + (endColor[i] - start) * scrollPercent);
  });

  body.style.backgroundColor = `rgb(${interpolatedColor.join(",")})`;
});
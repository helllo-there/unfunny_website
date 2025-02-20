document.addEventListener("DOMContentLoaded", function () {
    const BORDER_CUT_MARGIN = 5; // Adjust this to control border cut distance from title
  
    document.querySelectorAll(".sitelist-box").forEach(box => {
      const title = box.querySelector(".sitelist-title");
      const border = box.querySelector(".sitelist-border");
  
      if (title && border) {
        const titleWidth = title.offsetWidth;
        const titleHeight = title.offsetHeight;
  
        border.style.setProperty("--title-width", `${titleWidth}px`);
        border.style.setProperty("--title-height", `${titleHeight + 4}px`); // Adjust for border thickness
        border.style.setProperty("--border-cut-margin", `${BORDER_CUT_MARGIN}px`);
      }
    });
  });
  
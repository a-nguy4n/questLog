const slider = document.getElementById("color-slider");

slider.addEventListener("input", () => {
  const hue = slider.value;
  const color = `hsl(${hue}, 100%, 50%)`;
  console.log(color);
});

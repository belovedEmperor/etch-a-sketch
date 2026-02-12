function createGrid(width, height) {
  const grid = document.querySelector(".container");

  for (let i = 0; i < width; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let i = 0; i < height; i++) {
      const color = [
        Math.trunc(Math.random() * 255 + 1),
        Math.trunc(Math.random() * 255 + 1),
        Math.trunc(Math.random() * 255 + 1),
      ];
      const square = document.createElement("div");
      square.classList.add("square");
      square.onmouseover = (event) => {
        handleHover(event, color);
      };

      row.appendChild(square);
    }
    grid.appendChild(row);
  }
}

function handleHover(event, color) {
  if (
    !event.target.style.backgroundColor ||
    event.target.style.backgroundColor === ""
  ) {
    event.target.style.backgroundColor = `rgba(${color[0]},${color[1]},${color[2]},0.1)`;
  } else {
    const originalColor = event.target.style.backgroundColor;
    if (!originalColor.includes("rgba")) return;

    let newColor = originalColor.split(",");
    const oldAlpha = Number(newColor[3].trim().replace(")", ""));
    const newAlpha = oldAlpha + 0.1;
    newColor[3] = ` ${String(newAlpha)})`;
    newColor = newColor.join(",");
    event.target.style.backgroundColor = newColor;
  }
}

function removeGrid() {
  const grid = document.querySelector(".container");
  for (const row of grid.querySelectorAll(".row")) {
    grid.removeChild(row);
  }
}

function setGridSize(width, height) {
  let x, y;
  if (width || height) ((x = width), (y = height));
  else {
    const response = getUserResponse();
    if (!response[0] || !response[1] || !response || response === -1) {
      alert("Invalid response");
      return -1;
    }
    x = response[0];
    y = response[1];
  }
  removeGrid();
  createGrid(x, y);
}

function getUserResponse() {
  const userResponse = window.prompt(
    'What size would your like the grid to be?\nFormat: "<width>x<height>\nE.g., 16x16"\nMax size is 100',
  );
  const split = userResponse.split("x");
  let width,
    height = 0;
  width = Number(split[0]);
  height = Number(split[1]);

  if (
    !width ||
    !height ||
    isNaN(width) ||
    isNaN(height) ||
    width < 1 ||
    height < 1
  )
    return -1;
  if (width > 100 || height >= 100) {
    width = 100;
    height = 100;
  }

  return [width, height];
}

createGrid(16, 16);

export default function fill(pixels, position, newColor) {
  const newPixels = Object.assign({}, pixels);
  const oldColor = pixels[position];
  const [x, y] = position.split(",").map(parseFloat);

  function grow(x, y) {
    const pos = `${x},${y}`;
    if (newPixels[pos] === oldColor && newPixels[pos] !== newColor) {
      newPixels[pos] = newColor;
      grow(x, y - BLOCK_SIZE_PX);
      grow(x + BLOCK_SIZE_PX, y);
      grow(x, y + BLOCK_SIZE_PX);
      grow(x - BLOCK_SIZE_PX, y);
    }
  }

  grow(x, y);
  return newPixels;
}

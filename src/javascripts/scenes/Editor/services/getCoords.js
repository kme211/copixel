export default function getCoords(sectionX, sectionY, syntheticEvent) {
  const e = syntheticEvent.nativeEvent;
  let { offsetX, offsetY } = e;

  if (!offsetX && e.touches) {
    const touch = e.touches[0];
    const target = e.target;
    offsetX = touch.clientX - target.offsetParent.offsetLeft;
    offsetY = touch.clientY - target.offsetParent.offsetTop;
  }

  return [
    //Math.abs((Math.ceil(offsetX / BLOCK_SIZE_PX) * BLOCK_SIZE_PX) - BLOCK_SIZE_PX) + (sectionX * SECTION_SIZE_PX),
    //Math.abs((Math.ceil(offsetY / BLOCK_SIZE_PX) * BLOCK_SIZE_PX) - BLOCK_SIZE_PX) + (sectionY * SECTION_SIZE_PX)
    Math.floor(offsetX / BLOCK_SIZE_PX) * BLOCK_SIZE_PX +
      sectionX * SECTION_SIZE_PX,
    Math.floor(offsetY / BLOCK_SIZE_PX) * BLOCK_SIZE_PX +
      sectionY * SECTION_SIZE_PX
  ];
}

export function getLocalCoords(pixelX, pixelY, sectionX, sectionY) {
  return [
    pixelX - sectionX * SECTION_SIZE_PX,
    pixelY - sectionY * SECTION_SIZE_PX
  ];
}

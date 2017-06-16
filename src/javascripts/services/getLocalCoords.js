import { SECTION_SIZE_PX } from "../constants.js";

export default function getLocalCoords(pixelX, pixelY, sectionX, sectionY) {
  return [
    pixelX - sectionX * SECTION_SIZE_PX,
    pixelY - sectionY * SECTION_SIZE_PX
  ];
}

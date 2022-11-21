import sharp from "sharp";
import _ from "lodash";

const maxSize = 3000;
const minSize = 50;
async function resizeImage(
  imagePath: string,
  savingPath: string,
  width: number,
  height: number
) {
  let por = () => sharp(imagePath).resize(width, height).toFile(savingPath);
  await por();
}
function isNanOrNull(width: number, height: number) {
  return _.isNil(width) || _.isNil(height) || isNan(width, height);
}

function isNan(width: number, height: number): boolean {
  return _.isNaN(width) || _.isNaN(height);
}

function isCorrectImageSize(width: number, height: number): boolean {
  return (
    !isNanOrNull(width, height) &&
    !isNan(width, height) &&
    width >= minSize &&
    height >= minSize
  );
}
export { resizeImage, maxSize, minSize, isCorrectImageSize, isNanOrNull };

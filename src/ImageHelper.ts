import sharp from "sharp";
import _ from "lodash";
import e from "express";

const maxSize = 3000;
const minSize = 50;
async function resizeImage(
  imagePath: string,
  savingPath: string,
  width: number,
  height: number
): Promise<void> {
  const por = () => sharp(imagePath).resize(width, height).toFile(savingPath);
  await por();
}
function isNanOrNull(
  width: number | string | null,
  height: number | string | null
) {
  return _.isNil(width) || _.isNil(height) || isNan(width, height);
}

function isNan(
  width: number | string | null,
  height: number | string | null
): boolean {
  return _.isNaN(width) || _.isNaN(height);
}

function isCorrectImageSize(
  width: number | string | null,
  height: number | string | null
): boolean {
  return (
    !isNanOrNull(width, height) &&
    !isNan(width, height) &&
    _.isNumber(width) &&
    _.isNumber(height) &&
    width! >= minSize &&
    height! >= minSize &&
    width! <= maxSize &&
    height! <= maxSize
  );
}

function checkIsVaild(value: number | string | null): string {
  let error = "";

  if (_.isNaN(value) || _.isNil(value)) {
    return (error = "Please enter a VALUE");
  } else if (!_.isNumber(value)) {
    return (error = "VALUE [" + value + "] is not a number");
  } else if (value < minSize || value > maxSize) {
    return (error =
      "VALUE  [" + value + "] not between " + minSize + " and " + maxSize);
  } else return "";
}

function getDetailedErrorMessage(
  width: number | string | null,
  height: number | string | null
): string {
  let errorMessage = "";
  const checkWidth = checkIsVaild(width);
  const checkHeight = checkIsVaild(height);
  if (checkWidth.length > 0) {
    errorMessage += checkWidth.replace("VALUE", "Width") + ".";
  }
  if (checkHeight.length > 0) {
    errorMessage += checkHeight.replace("VALUE", "Height") + ".";
  }
  return errorMessage;
}
export {
  resizeImage,
  maxSize,
  minSize,
  isCorrectImageSize,
  isNanOrNull,
  getDetailedErrorMessage,
};

import path from "path";
import fs from "fs";

import { isCorrectImageSize } from "./ImageHelper";

const imagesPath = path.join(__dirname, "..", "images");
const thumbnailsPath = path.join(__dirname, "..", "thumbnails");

function checkIfFileExists(file: string): boolean {
  return fs.existsSync(file);
}

function isCachedVersionExists(fileName: string): boolean {
  const imagePath = path.resolve(thumbnailsPath, fileName);
  return checkIfFileExists(imagePath);
}

function generateFileName(
  fileName: string,
  width: number | string | null,
  height: number | string | null
): string {
  if (isCorrectImageSize(width, height)) {
    return fileName + "-" + width + "x" + height + ".jpg";
  } else {
    return fileName + ".jpg";
  }
}

function getFullFileName(fileName: string): string {
  return path.resolve(imagesPath, fileName);
}

function getCachedFullFileName(fileName: string): string {
  if (!fs.existsSync(thumbnailsPath)) {
    fs.mkdirSync(thumbnailsPath);
  }
  return path.resolve(thumbnailsPath, fileName);
}

export {
  checkIfFileExists,
  isCachedVersionExists,
  generateFileName,
  getFullFileName,
  getCachedFullFileName,
  thumbnailsPath,
  imagesPath,
};

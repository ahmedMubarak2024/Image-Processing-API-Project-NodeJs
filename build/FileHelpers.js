"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesPath = exports.thumbnailsPath = exports.getCachedFullFileName = exports.getFullFileName = exports.generateFileName = exports.isCachedVersionExists = exports.checkIfFileExists = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const ImageHelper_1 = require("./ImageHelper");
const imagesPath = path_1.default.join(__dirname, "..", "images");
exports.imagesPath = imagesPath;
const thumbnailsPath = path_1.default.join(__dirname, "..", "thumbnails");
exports.thumbnailsPath = thumbnailsPath;
function checkIfFileExists(file) {
    return fs_1.default.existsSync(file);
}
exports.checkIfFileExists = checkIfFileExists;
function isCachedVersionExists(fileName) {
    const imagePath = path_1.default.resolve(thumbnailsPath, fileName);
    return checkIfFileExists(imagePath);
}
exports.isCachedVersionExists = isCachedVersionExists;
function generateFileName(fileName, width, height) {
    if ((0, ImageHelper_1.isCorrectImageSize)(width, height)) {
        return fileName + "-" + width + "x" + height + ".jpg";
    }
    else {
        return fileName + ".jpg";
    }
}
exports.generateFileName = generateFileName;
function getFullFileName(fileName) {
    return path_1.default.resolve(imagesPath, fileName);
}
exports.getFullFileName = getFullFileName;
function getCachedFullFileName(fileName) {
    if (!fs_1.default.existsSync(thumbnailsPath)) {
        fs_1.default.mkdirSync(thumbnailsPath);
    }
    return path_1.default.resolve(thumbnailsPath, fileName);
}
exports.getCachedFullFileName = getCachedFullFileName;

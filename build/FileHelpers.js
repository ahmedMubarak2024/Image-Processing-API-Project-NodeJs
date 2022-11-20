"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedFullFileName = exports.getFullFileName = exports.generateFileName = exports.isCachedVersionExists = exports.checkIfFileExists = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imagesPath = path_1.default.join(__dirname, '..', 'images');
const thumbnailsPath = path_1.default.join(__dirname, '..', 'thumbnails');
function checkIfFileExists(file) {
    return fs_1.default.existsSync(file);
}
exports.checkIfFileExists = checkIfFileExists;
function isCachedVersionExists(fileName) {
    let imagePath = path_1.default.resolve(thumbnailsPath, fileName);
    return checkIfFileExists(imagePath);
}
exports.isCachedVersionExists = isCachedVersionExists;
function generateFileName(fileName, width, height) {
    if (width && height) {
        return fileName + '-' + width + 'x' + height + '.jpg';
    }
    else {
        return fileName + '.jpg';
    }
}
exports.generateFileName = generateFileName;
function getFullFileName(fileName) {
    return path_1.default.resolve(imagesPath, fileName);
}
exports.getFullFileName = getFullFileName;
function getCachedFullFileName(fileName) {
    return path_1.default.resolve(thumbnailsPath, fileName);
}
exports.getCachedFullFileName = getCachedFullFileName;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNanOrNull = exports.isCorrectImageSize = exports.minSize = exports.maxSize = exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const lodash_1 = __importDefault(require("lodash"));
const maxSize = 3000;
exports.maxSize = maxSize;
const minSize = 50;
exports.minSize = minSize;
function resizeImage(imagePath, savingPath, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        let por = () => (0, sharp_1.default)(imagePath).resize(width, height).toFile(savingPath);
        yield por();
    });
}
exports.resizeImage = resizeImage;
function isNanOrNull(width, height) {
    return lodash_1.default.isNil(width) || lodash_1.default.isNil(height) || isNan(width, height);
}
exports.isNanOrNull = isNanOrNull;
function isNan(width, height) {
    return lodash_1.default.isNaN(width) || lodash_1.default.isNaN(height);
}
function isCorrectImageSize(width, height) {
    return (!isNanOrNull(width, height) &&
        !isNan(width, height) &&
        width >= minSize &&
        height >= minSize);
}
exports.isCorrectImageSize = isCorrectImageSize;

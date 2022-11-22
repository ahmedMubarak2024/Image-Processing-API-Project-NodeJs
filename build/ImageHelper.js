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
exports.getDetailedErrorMessage = exports.isNanOrNull = exports.isCorrectImageSize = exports.minSize = exports.maxSize = exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const lodash_1 = __importDefault(require("lodash"));
const maxSize = 3000;
exports.maxSize = maxSize;
const minSize = 50;
exports.minSize = minSize;
function resizeImage(imagePath, savingPath, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        const por = () => (0, sharp_1.default)(imagePath).resize(width, height).toFile(savingPath);
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
        lodash_1.default.isNumber(width) &&
        lodash_1.default.isNumber(height) &&
        width >= minSize &&
        height >= minSize &&
        width <= maxSize &&
        height <= maxSize);
}
exports.isCorrectImageSize = isCorrectImageSize;
function checkIsVaild(value) {
    let error = "";
    if (lodash_1.default.isNaN(value) || lodash_1.default.isNil(value)) {
        return (error = "Please enter a VALUE");
    }
    else if (!lodash_1.default.isNumber(value)) {
        return (error = "VALUE [" + value + "] is not a number");
    }
    else if (value < minSize || value > maxSize) {
        return (error =
            "VALUE  [" + value + "] not between " + minSize + " and " + maxSize);
    }
    else
        return "";
}
function getDetailedErrorMessage(width, height) {
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
exports.getDetailedErrorMessage = getDetailedErrorMessage;

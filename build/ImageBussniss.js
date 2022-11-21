"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfImageCacheNotExistCacheIt = void 0;
const FileHelpers_1 = require("./FileHelpers");
const ImageHelper_1 = require("./ImageHelper");
function checkIfImageCacheNotExistCacheIt(fileName, width, height) {
    return new Promise((resolve, reject) => {
        let realFileName = (0, FileHelpers_1.getFullFileName)((0, FileHelpers_1.generateFileName)(fileName, NaN, NaN));
        let cachedFullName = (0, FileHelpers_1.getCachedFullFileName)((0, FileHelpers_1.generateFileName)(fileName, width, height));
        if (!(0, FileHelpers_1.checkIfFileExists)(realFileName)) {
            let error;
            if (fileName)
                error = "Image does not exist";
            else
                error = "please Enter Image Name";
            resolve({ state: false, error: error });
            return;
        }
        if ((0, ImageHelper_1.isNanOrNull)(width, height)) {
            resolve({ state: true, path: realFileName });
            return;
        }
        if (!(0, ImageHelper_1.isCorrectImageSize)(width, height)) {
            resolve({
                state: false,
                error: "please Enter Valid Width and Height between" +
                    ImageHelper_1.minSize +
                    ":" +
                    ImageHelper_1.maxSize,
            });
            return;
        }
        if (!(0, FileHelpers_1.isCachedVersionExists)(cachedFullName)) {
            (0, ImageHelper_1.resizeImage)(realFileName, cachedFullName, width, height).then(() => {
                if ((0, FileHelpers_1.checkIfFileExists)(cachedFullName))
                    resolve({ state: true, path: cachedFullName });
                else
                    resolve({
                        state: false,
                        error: "could not resize image Or Load the Resize Image",
                    });
            });
        }
        else {
            resolve({ state: true, path: cachedFullName });
        }
    });
}
exports.checkIfImageCacheNotExistCacheIt = checkIfImageCacheNotExistCacheIt;

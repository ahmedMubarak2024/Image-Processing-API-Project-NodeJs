import {
  checkIfFileExists,
  generateFileName,
  isCachedVersionExists,
  getCachedFullFileName,
  getFullFileName,
} from "./FileHelpers";
import {
  resizeImage,
  isCorrectImageSize,
  isNanOrNull,
  getDetailedErrorMessage,
} from "./ImageHelper";

interface ImageCheckResponse {
  state: boolean;
  path?: string;
  error?: string;
}

function checkIfImageCacheNotExistCacheIt(
  fileName: string,
  width: number | string | null,
  height: number | string | null
): Promise<ImageCheckResponse> {
  return new Promise<ImageCheckResponse>((resolve) => {
    const realFileName = getFullFileName(generateFileName(fileName, NaN, NaN));
    const cachedFullName = getCachedFullFileName(
      generateFileName(fileName, width, height)
    );
    if (!checkIfFileExists(realFileName)) {
      let error: string;
      if (fileName) error = "Image does not exist";
      else error = "please Enter Image Name";
      resolve({ state: false, error: error });
      return;
    }
    if (isNanOrNull(width, height)) {
      resolve({ state: true, path: realFileName });
      return;
    }
    if (!isCorrectImageSize(width, height)) {
      resolve({
        state: false,
        error: getDetailedErrorMessage(width, height),
      });
      return;
    }

    if (!isCachedVersionExists(cachedFullName)) {
      resizeImage(
        realFileName,
        cachedFullName,
        width! as number,
        height! as number
      ).then(() => {
        if (checkIfFileExists(cachedFullName))
          resolve({ state: true, path: cachedFullName });
        else
          resolve({
            state: false,
            error: "could not resize image Or Load the Resize Image",
          });
      });
    } else {
      resolve({ state: true, path: cachedFullName });
    }
  });
}

export { checkIfImageCacheNotExistCacheIt, ImageCheckResponse };

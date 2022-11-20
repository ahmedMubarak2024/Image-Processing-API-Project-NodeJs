import {
  checkIfFileExists,
  generateFileName,
  isCachedVersionExists,
  getCachedFullFileName,
  getFullFileName,
} from "./FileHelpers";
import { resizeImage,maxSize,minSize,
    isCorrectImageSize,
    isNanOrNull } from "./ImageHelper";

interface GreetingSettings {
  state: boolean;
  path?: string;
  error?: string;
}

function checkIfImageCacheNotExistCacheIt(
  fileName: string,
  width: number,
  height: number
): Promise<GreetingSettings> {
   return new Promise<GreetingSettings>((resolve, reject)=>{
        let realFileName = getFullFileName(generateFileName(fileName, NaN, NaN));
        let cachedFullName = getCachedFullFileName(
          generateFileName(fileName, width, height)
        );
        if (!checkIfFileExists(realFileName)) {
          let error: string;
          if (fileName) error = "Image does not exist";
          else error = "please Enter Image Name";
          resolve( { state: false, error: error });
        return
        }
        if(isNanOrNull(width, height)){
            resolve({state:true,path:realFileName})
            return
        }
        if (!isCorrectImageSize(width, height)) {
            resolve( { state: false, error: "please Enter Valid Width and Height between"+ minSize+":"+maxSize });
            return
        }
        
          if (!isCachedVersionExists(cachedFullName)) {
            resizeImage(realFileName, cachedFullName, width, height).then(() => {
                if (checkIfFileExists(cachedFullName))
                resolve( { state: true, path: cachedFullName });
                else
                resolve( {
                    state: false,
                    error: "could not resize image Or Load the Resize Image",
                  });
            })
           
          } else {
            resolve( { state: true, path: cachedFullName });
          }
    })
 

}


export { checkIfImageCacheNotExistCacheIt,GreetingSettings };

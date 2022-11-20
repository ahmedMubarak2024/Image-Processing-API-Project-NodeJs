import path from "path";
import fs  from 'fs';

const imagesPath = path.join(__dirname, '..', 'images', 'fjord.jpg')




try {
    if (fs.existsSync(imagesPath)) {
      console.log(`${imagesPath} already exists`);
    }
  } catch(err) {
    console.error(err)
  }

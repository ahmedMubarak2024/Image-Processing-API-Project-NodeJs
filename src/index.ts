import ex from "express";
import { isNumber, isString } from "lodash";
import {
  checkIfImageCacheNotExistCacheIt,
  ImageCheckResponse,
} from "./ImageBussniss";
const app = ex();
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
app.get("/api/images", function (req, res) {
  const imageName: string = req.query.fileName?.toString() || "";
  let width: number | null | string = null;
  let height: number | null | string = null;
  if (isString(req.query.width) && !isNaN(Number(req.query.width)))
    width = Number(req.query.width);
  else if (isString(req.query.width)) width = req.query.width;
  else width = null;
  if (isString(req.query.height) && !isNaN(Number(req.query.height)))
    height = Number(req.query.height);
  else if (isString(req.query.height)) height = req.query.height;
  else height = null;
  console.log(imageName + " " + width + " " + height);
  const statues: Promise<ImageCheckResponse> = checkIfImageCacheNotExistCacheIt(
    imageName,
    width,
    height
  );
  statues.then((result) => {
    if (result.state) {
      res.statusCode = 200;
      res.set("Content-Type", "image/jpeg");
      res.sendFile(result.path || "");
      console.log(result.path + " success");
    } else {
      res.statusCode = 400;
      res.send(result.error || "");
      console.log(result.error + " error");
    }
  });
});

export { app };

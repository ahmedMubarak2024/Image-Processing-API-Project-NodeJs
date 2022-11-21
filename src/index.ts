import ex from "express";
import {
  checkIfImageCacheNotExistCacheIt,
  ImageCheckResponse,
} from "./ImageBussniss";
let app = ex();
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
app.get("/api/images", function (req, res) {
  let imageName: string = String(req.query.fileName);
  let width: number = req.query.width as any as number;
  let height: number = req.query.height as any as number;
  console.log(imageName + " " + width + " " + height);
  let statues: Promise<ImageCheckResponse> = checkIfImageCacheNotExistCacheIt(
    imageName,
    width,
    height
  );
  statues.then((result) => {
    if (result.state) {
      res.set("Content-Type", "image/jpeg");
      res.sendFile(result.path || "");
      console.log(result.path + " success");
    } else {
      //res.set("Content-Type", "html/text");
      res.send(result.error || "");
      console.log(result.error + " error");
    }
  });
});

export { app };

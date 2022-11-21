import {
  checkIfImageCacheNotExistCacheIt,
  ImageCheckResponse,
} from "../ImageBussniss";
import {
  isCachedVersionExists,
  checkIfFileExists,
  thumbnailsPath,
} from "../FileHelpers";
import path from "path";
import fs from "fs";

describe("Image Business checkIfImageCacheNotExistCacheIt", () => {
  it("request image with name fjord should work and find image in images", async () => {
    let response: ImageCheckResponse = await checkIfImageCacheNotExistCacheIt(
      "fjord",
      undefined as any,
      undefined as any
    );
    expect(response.state).toEqual(true);
    expect(response.path).toContain("images");
  });

  it("request image with name icelandwaterfall should work and find image in ordinal images", async () => {
    let response: ImageCheckResponse = await checkIfImageCacheNotExistCacheIt(
      "icelandwaterfall",
      NaN,
      NaN
    );
    expect(response.state).toEqual(true);
    expect(response.path).toContain("images");
    expect(checkIfFileExists(response.path || "")).toEqual(true);
  });

  it("request image with name icelandwaterfall should work and find image in ordinal images", async () => {
    let response: ImageCheckResponse = await checkIfImageCacheNotExistCacheIt(
      "icelandwaterfall",
      60,
      60
    );
    expect(response.state).toEqual(true);
    expect(response.path).toContain("thumbnails");
    expect(response.path).toContain("icelandwaterfall-60x60.jpg");
    expect(isCachedVersionExists("icelandwaterfall-60x60.jpg")).toBe(true);
  });

  beforeAll(async () => {
    if (!fs.existsSync(thumbnailsPath)) {
      fs.mkdirSync(thumbnailsPath);
    }
    var writeStream = fs.createWriteStream(
      path.resolve(thumbnailsPath, "fjord.jpg")
    );
    writeStream.end();
  });

  afterAll(async () => {
    fs.rmSync(thumbnailsPath, { recursive: true, force: true });
  });
});

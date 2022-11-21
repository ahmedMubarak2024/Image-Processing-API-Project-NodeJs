import {
  checkIfFileExists,
  generateFileName,
  getCachedFullFileName,
  getFullFileName,
  isCachedVersionExists,
  thumbnailsPath,
} from "../FileHelpers";
import fs from "fs";
import path from "path";

describe("FileHelperSpec generateFileName", function () {
  let foo: number = 0;

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

  it("when entering no or bad width and bad height we work with the original image name", function () {
    expect(generateFileName("image", Number("a"), Number("a"))).toEqual(
      "image.jpg"
    );
  });

  it("when entering no or bad width and bad height we work with the original image name", function () {
    expect(generateFileName("image", NaN, NaN)).toEqual("image.jpg");
  });

  it("when entering no or bad width and bad height we work with the original image name", function () {
    let s: number = undefined as any as number;
    expect(generateFileName("image", s, s)).toEqual("image.jpg");
  });

  it("when entering bad width and good height  we work with the original image name", function () {
    expect(generateFileName("image", 70, Number("a"))).toEqual("image.jpg");
  });

  it("when entering good width and good height or both we work with the new  image name", function () {
    expect(generateFileName("image", 50, 50)).toEqual("image-50x50.jpg");
  });

  it("when entering width or height less than minSize of 50 we work with the orginal image name", function () {
    expect(generateFileName("image", 40, 40)).toEqual("image.jpg");
  });
});

describe("FileHelperSpec checkIfFileExists", () => {
  it("when entering valid file name we should get True exists", function () {
    expect(checkIfFileExists(getFullFileName("fjord.jpg"))).toBe(true);
  });

  it("when entering InValid file name we should get False not Exists", function () {
    expect(checkIfFileExists(getFullFileName("not image.jpg"))).toBe(false);
  });
});

describe("FileHelperSpec getCachedFullFileName", () => {
  it("when entering valid file name we should get Path containing thumbnails as Folder", function () {
    expect(getCachedFullFileName("fjord.jpg")).toContain("thumbnails");
  });
});

describe("FileHelperSpec isCachedVersionExists", () => {
  it("when entering valid file name we should get True exists", function () {
    expect(isCachedVersionExists(getFullFileName("fjord.jpg"))).toBe(true);
  });

  it("when entering InValid file name we should get False not Exists", function () {
    expect(isCachedVersionExists(getFullFileName("notimage.jpg"))).toBe(false);
  });
});

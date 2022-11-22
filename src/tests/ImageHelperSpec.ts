import {
  isCorrectImageSize,
  isNanOrNull,
  maxSize,
  minSize,
  resizeImage,
} from "../ImageHelper";
import {
  isCachedVersionExists,
  checkIfFileExists,
  thumbnailsPath,
} from "../FileHelpers";
import path from "path";
import fs from "fs";

describe("ImageHelper::isNanOrNull", () => {
  it("i send undefined should return true", () => {
    expect(isNanOrNull(undefined as any, undefined as any)).toBe(true);
  });
  it("i send real number should return false", () => {
    expect(isNanOrNull(10, 10)).toBe(false);
  });
});

describe("ImageHelper::isCorrectImageSize", () => {
  it("i send undefined should return false", () => {
    expect(isCorrectImageSize(undefined as any, undefined as any)).toBe(false);
  });
  it("i send minSize should return true", () => {
    expect(isCorrectImageSize(minSize, minSize)).toBe(true);
  });

  it("i send real number should return false", () => {
    expect(isCorrectImageSize(0, 0)).toBe(false);
  });

  it("i send real number should return false", () => {
    expect(isCorrectImageSize(NaN, NaN)).toBe(false);
  });
});

describe("ImageHelper::resizeImage", () => {
  const imagesPath = path.join(
    __dirname,
    "..",
    "..",
    "images",
    "icelandwaterfall.jpg"
  );
  const thumbnailsPath = path.join(__dirname, "..", "..", "thumbnails");
  afterAll(async () => {
    fs.rmSync(thumbnailsPath, { recursive: true, force: true });
  });
  beforeAll(async () => {
    if (!fs.existsSync(thumbnailsPath)) {
      fs.mkdirSync(thumbnailsPath);
    }
  });

  it("new cached version should be created ", async () => {
    const cachedFullName = path.join(thumbnailsPath, "icelandwaterfall.jpg");
    await resizeImage(imagesPath, cachedFullName, 60, 60).then(() => {
      expect(isCachedVersionExists(cachedFullName)).toBeTrue();
    });
  });
});

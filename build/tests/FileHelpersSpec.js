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
const FileHelpers_1 = require("../FileHelpers");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
describe("FileHelperSpec generateFileName", function () {
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        if (!fs_1.default.existsSync(FileHelpers_1.thumbnailsPath)) {
            fs_1.default.mkdirSync(FileHelpers_1.thumbnailsPath);
        }
        const writeStream = fs_1.default.createWriteStream(path_1.default.resolve(FileHelpers_1.thumbnailsPath, "fjord.jpg"));
        writeStream.end();
    }));
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        fs_1.default.rmSync(FileHelpers_1.thumbnailsPath, { recursive: true, force: true });
    }));
    it("when entering no or bad width and bad height we work with the original image name", function () {
        expect((0, FileHelpers_1.generateFileName)("image", Number("a"), Number("a"))).toEqual("image.jpg");
    });
    it("when entering no or bad width and bad height we work with the original image name", function () {
        expect((0, FileHelpers_1.generateFileName)("image", NaN, NaN)).toEqual("image.jpg");
    });
    it("when entering no or bad width and bad height we work with the original image name", function () {
        const s = undefined;
        expect((0, FileHelpers_1.generateFileName)("image", s, s)).toEqual("image.jpg");
    });
    it("when entering bad width and good height  we work with the original image name", function () {
        expect((0, FileHelpers_1.generateFileName)("image", 70, Number("a"))).toEqual("image.jpg");
    });
    it("when entering good width and good height or both we work with the new  image name", function () {
        expect((0, FileHelpers_1.generateFileName)("image", 50, 50)).toEqual("image-50x50.jpg");
    });
    it("when entering width or height less than minSize of 50 we work with the orginal image name", function () {
        expect((0, FileHelpers_1.generateFileName)("image", 40, 40)).toEqual("image.jpg");
    });
});
describe("FileHelperSpec checkIfFileExists", () => {
    it("when entering valid file name we should get True exists", function () {
        expect((0, FileHelpers_1.checkIfFileExists)((0, FileHelpers_1.getFullFileName)("fjord.jpg"))).toBe(true);
    });
    it("when entering InValid file name we should get False not Exists", function () {
        expect((0, FileHelpers_1.checkIfFileExists)((0, FileHelpers_1.getFullFileName)("not image.jpg"))).toBe(false);
    });
});
describe("FileHelperSpec getCachedFullFileName", () => {
    it("when entering valid file name we should get Path containing thumbnails as Folder", function () {
        expect((0, FileHelpers_1.getCachedFullFileName)("fjord.jpg")).toContain("thumbnails");
    });
});
describe("FileHelperSpec isCachedVersionExists", () => {
    it("when entering valid file name we should get True exists", function () {
        expect((0, FileHelpers_1.isCachedVersionExists)((0, FileHelpers_1.getFullFileName)("fjord.jpg"))).toBe(true);
    });
    it("when entering InValid file name we should get False not Exists", function () {
        expect((0, FileHelpers_1.isCachedVersionExists)((0, FileHelpers_1.getFullFileName)("notimage.jpg"))).toBe(false);
    });
});

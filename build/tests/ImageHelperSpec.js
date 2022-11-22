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
const ImageHelper_1 = require("../ImageHelper");
const FileHelpers_1 = require("../FileHelpers");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
describe("ImageHelper::isNanOrNull", () => {
    it("i send undefined should return true", () => {
        expect((0, ImageHelper_1.isNanOrNull)(undefined, undefined)).toBe(true);
    });
    it("i send real number should return false", () => {
        expect((0, ImageHelper_1.isNanOrNull)(10, 10)).toBe(false);
    });
});
describe("ImageHelper::isCorrectImageSize", () => {
    it("i send undefined should return false", () => {
        expect((0, ImageHelper_1.isCorrectImageSize)(undefined, undefined)).toBe(false);
    });
    it("i send minSize should return true", () => {
        expect((0, ImageHelper_1.isCorrectImageSize)(ImageHelper_1.minSize, ImageHelper_1.minSize)).toBe(true);
    });
    it("i send real number should return false", () => {
        expect((0, ImageHelper_1.isCorrectImageSize)(0, 0)).toBe(false);
    });
    it("i send real number should return false", () => {
        expect((0, ImageHelper_1.isCorrectImageSize)(NaN, NaN)).toBe(false);
    });
});
describe("ImageHelper::resizeImage", () => {
    const imagesPath = path_1.default.join(__dirname, "..", "..", "images", "icelandwaterfall.jpg");
    const thumbnailsPath = path_1.default.join(__dirname, "..", "..", "thumbnails");
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        fs_1.default.rmSync(thumbnailsPath, { recursive: true, force: true });
    }));
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!fs_1.default.existsSync(thumbnailsPath)) {
            fs_1.default.mkdirSync(thumbnailsPath);
        }
    }));
    it("new cached version should be created ", () => __awaiter(void 0, void 0, void 0, function* () {
        const cachedFullName = path_1.default.join(thumbnailsPath, "icelandwaterfall.jpg");
        yield (0, ImageHelper_1.resizeImage)(imagesPath, cachedFullName, 60, 60).then(() => {
            expect((0, FileHelpers_1.isCachedVersionExists)(cachedFullName)).toBeTrue();
        });
    }));
});

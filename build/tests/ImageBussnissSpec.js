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
const ImageBussniss_1 = require("../ImageBussniss");
const FileHelpers_1 = require("../FileHelpers");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
describe("Image Business checkIfImageCacheNotExistCacheIt", () => {
    it("request image with name fjord should work and find image in images", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, ImageBussniss_1.checkIfImageCacheNotExistCacheIt)("fjord", undefined, undefined);
        expect(response.state).toEqual(true);
        expect(response.path).toContain("images");
    }));
    it("request image with name icelandwaterfall should work and find image in ordinal images", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, ImageBussniss_1.checkIfImageCacheNotExistCacheIt)("icelandwaterfall", NaN, NaN);
        expect(response.state).toEqual(true);
        expect(response.path).toContain("images");
        expect((0, FileHelpers_1.checkIfFileExists)(response.path || "")).toEqual(true);
    }));
    it("request image with name icelandwaterfall should work and find image in ordinal images", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, ImageBussniss_1.checkIfImageCacheNotExistCacheIt)("icelandwaterfall", 60, 60);
        expect(response.state).toEqual(true);
        expect(response.path).toContain("thumbnails");
        expect(response.path).toContain("icelandwaterfall-60x60.jpg");
        expect((0, FileHelpers_1.isCachedVersionExists)("icelandwaterfall-60x60.jpg")).toBe(true);
    }));
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!fs_1.default.existsSync(FileHelpers_1.thumbnailsPath)) {
            fs_1.default.mkdirSync(FileHelpers_1.thumbnailsPath);
        }
        const writeStream = fs_1.default.createWriteStream(path_1.default.resolve(FileHelpers_1.thumbnailsPath, "fjord.jpg"));
        writeStream.end();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        fs_1.default.rmSync(FileHelpers_1.thumbnailsPath, { recursive: true, force: true });
    }));
});

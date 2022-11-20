"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imagesPath = path_1.default.join(__dirname, '..', 'images', 'fjord.jpg');
try {
    if (fs_1.default.existsSync(imagesPath)) {
        console.log(`${imagesPath} already exists`);
    }
}
catch (err) {
    console.error(err);
}

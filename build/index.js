"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FileHelpers_1 = require("./FileHelpers");
let app = (0, express_1.default)();
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
});
app.get('/api/images', function (req, res) {
    let imageName = String(req.query.fileName);
    let width = Number(req.query.width);
    let height = Number(req.query.height);
    console.log(imageName + " " + width + " " + height);
    let fullFileName = (0, FileHelpers_1.generateFileName)(imageName, width, height);
    res.set("Content-Type", "image/jpeg");
    res.sendFile((0, FileHelpers_1.getFullFileName)(fullFileName));
});

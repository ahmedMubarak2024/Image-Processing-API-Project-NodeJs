"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const ImageBussniss_1 = require("./ImageBussniss");
let app = (0, express_1.default)();
exports.app = app;
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
});
app.get("/api/images", function (req, res) {
    let imageName = String(req.query.fileName);
    let width = req.query.width;
    let height = req.query.height;
    console.log(imageName + " " + width + " " + height);
    let statues = (0, ImageBussniss_1.checkIfImageCacheNotExistCacheIt)(imageName, width, height);
    statues.then((result) => {
        if (result.state) {
            res.set("Content-Type", "image/jpeg");
            res.sendFile(result.path || "");
            console.log(result.path + " success");
        }
        else {
            //res.set("Content-Type", "html/text");
            res.send(result.error || "");
            console.log(result.error + " error");
        }
    });
});

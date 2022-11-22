"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const lodash_1 = require("lodash");
const ImageBussniss_1 = require("./ImageBussniss");
const app = (0, express_1.default)();
exports.app = app;
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
});
app.get("/api/images", function (req, res) {
    var _a;
    const imageName = ((_a = req.query.fileName) === null || _a === void 0 ? void 0 : _a.toString()) || "";
    let width = null;
    let height = null;
    if ((0, lodash_1.isString)(req.query.width) && !isNaN(Number(req.query.width)))
        width = Number(req.query.width);
    else if ((0, lodash_1.isString)(req.query.width))
        width = req.query.width;
    else
        width = null;
    if ((0, lodash_1.isString)(req.query.height) && !isNaN(Number(req.query.height)))
        height = Number(req.query.height);
    else if ((0, lodash_1.isString)(req.query.height))
        height = req.query.height;
    else
        height = null;
    console.log(imageName + " " + width + " " + height);
    const statues = (0, ImageBussniss_1.checkIfImageCacheNotExistCacheIt)(imageName, width, height);
    statues.then((result) => {
        if (result.state) {
            res.statusCode = 200;
            res.set("Content-Type", "image/jpeg");
            res.sendFile(result.path || "");
            console.log(result.path + " success");
        }
        else {
            res.statusCode = 400;
            res.send(result.error || "");
            console.log(result.error + " error");
        }
    });
});

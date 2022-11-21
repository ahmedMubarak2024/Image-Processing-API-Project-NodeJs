"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
const request = (0, supertest_1.default)(index_1.app);
describe('Test image wrong prams ', () => {
    it('test Endpoint is Working ', () => {
        request.get('/api/images?filename=fjord').then((req) => {
            expect(req.status).toBe(200);
        });
    });
});

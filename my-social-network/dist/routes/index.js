"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_1 = __importDefault(require("./api"));
const router = (0, express_1.Router)();
router.use("/api", api_1.default);
router.use((_req, res) => {
    res.status(404).send("404 Not Found");
});
exports.default = router;

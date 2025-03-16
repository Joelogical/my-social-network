"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../../controllers/userController"));
const router = (0, express_1.Router)();
// /api/users
router.route("/").get(userController_1.default.getUsers).post(userController_1.default.createUser);
// /api/users/:id
router
    .route("/:id")
    .get(userController_1.default.getUserById)
    .put(userController_1.default.updateUser)
    .delete(userController_1.default.deleteUser);
// /api/users/:userId/friends/:friendId
router
    .route("/:userId/friends/:friendId")
    .post(userController_1.default.addFriend)
    .delete(userController_1.default.removeFriend);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const thoughtController_1 = __importDefault(require("../../controllers/thoughtController"));
const router = (0, express_1.Router)();
// /api/thoughts
router.route("/").get(thoughtController_1.default.getThoughts).post(thoughtController_1.default.createThought);
// /api/thoughts/:id
router
    .route("/:id")
    .get(thoughtController_1.default.getThoughtById)
    .put(thoughtController_1.default.updateThought)
    .delete(thoughtController_1.default.deleteThought);
// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(thoughtController_1.default.addReaction);
// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(thoughtController_1.default.removeReaction);
exports.default = router;

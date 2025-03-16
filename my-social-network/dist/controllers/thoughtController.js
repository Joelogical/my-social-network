"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Thought_1 = __importDefault(require("../models/Thought"));
const User_1 = __importDefault(require("../models/User"));
const thoughtController = {
    // Get all thoughts
    async getThoughts(_req, res) {
        try {
            const thoughts = await Thought_1.default.find();
            res.json(thoughts);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Get single thought by ID
    async getThoughtById(req, res) {
        try {
            const thought = await Thought_1.default.findById(req.params.id);
            if (!thought) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought_1.default.create(req.body);
            // Add thought to user's thoughts array
            await User_1.default.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, { runValidators: true, new: true });
            if (!thought) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought_1.default.findByIdAndDelete(req.params.id);
            if (!thought) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            // Remove thought from user's thoughts array
            await User_1.default.findByIdAndUpdate(thought.userId, {
                $pull: { thoughts: req.params.id },
            });
            res.json({ message: "Thought deleted!" });
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Add reaction
    async addReaction(req, res) {
        try {
            const thought = await Thought_1.default.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { runValidators: true, new: true });
            if (!thought) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove reaction
    async removeReaction(req, res) {
        try {
            const thought = await Thought_1.default.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
            if (!thought) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};
exports.default = thoughtController;

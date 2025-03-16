"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Thought_1 = __importDefault(require("../models/Thought"));
const userController = {
    // Get all users
    async getUsers(_req, res) {
        try {
            const users = await User_1.default.find().populate("thoughts").populate("friends");
            res.json(users);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Get single user by ID
    async getUserById(req, res) {
        try {
            const user = await User_1.default.findById(req.params.id)
                .populate("thoughts")
                .populate("friends");
            if (!user) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a new user
    async createUser(req, res) {
        try {
            const user = await User_1.default.create(req.body);
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, { runValidators: true, new: true });
            if (!user) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a user and their thoughts
    async deleteUser(req, res) {
        try {
            const user = await User_1.default.findById(req.params.id);
            if (!user) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            // Delete user's thoughts
            await Thought_1.default.deleteMany({ username: user.username });
            // Delete user
            await User_1.default.findByIdAndDelete(req.params.id);
            res.json({ message: "User and associated thoughts deleted!" });
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Add friend
    async addFriend(req, res) {
        try {
            const user = await User_1.default.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove friend
    async removeFriend(req, res) {
        try {
            const user = await User_1.default.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};
exports.default = userController;

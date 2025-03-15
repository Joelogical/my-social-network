import { Request, Response } from "express";
import { Types } from "mongoose";
import User, { IUser } from "../models/User";
import Thought from "../models/Thought";

interface UserRequestBody {
  username: string;
  email: string;
}

const userController = {
  // Get all users
  async getUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find().populate("thoughts").populate("friends");
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get single user by ID
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.params.id)
        .populate("thoughts")
        .populate("friends");
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(
    req: Request<{}, {}, UserRequestBody>,
    res: Response
  ): Promise<void> {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(
    req: Request<{ id: string }, {}, Partial<UserRequestBody>>,
    res: Response
  ): Promise<void> {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user and their thoughts
  async deleteUser(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      // Delete user's thoughts
      await Thought.deleteMany({ username: user.username });
      // Delete user
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add friend
  async addFriend(
    req: Request<{ userId: string; friendId: string }>,
    res: Response
  ): Promise<void> {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove friend
  async removeFriend(
    req: Request<{ userId: string; friendId: string }>,
    res: Response
  ): Promise<void> {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default userController;

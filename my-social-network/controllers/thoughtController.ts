import { Request, Response } from "express";
import Thought, { IThought, IReaction } from "../models/Thought";
import User from "../models/User";

interface ThoughtRequestBody {
  thoughtText: string;
  username: string;
  userId: string;
}

interface ReactionRequestBody {
  reactionBody: string;
  username: string;
}

const thoughtController = {
  // Get all thoughts
  async getThoughts(_req: Request, res: Response): Promise<void> {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get single thought by ID
  async getThoughtById(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new thought
  async createThought(
    req: Request<{}, {}, ThoughtRequestBody>,
    res: Response
  ): Promise<void> {
    try {
      const thought = await Thought.create(req.body);
      // Add thought to user's thoughts array
      await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought
  async updateThought(
    req: Request<{ id: string }, {}, Partial<ThoughtRequestBody>>,
    res: Response
  ): Promise<void> {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a thought
  async deleteThought(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      // Remove thought from user's thoughts array
      await User.findByIdAndUpdate(thought.userId, {
        $pull: { thoughts: req.params.id },
      });
      res.json({ message: "Thought deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add reaction
  async addReaction(
    req: Request<{ thoughtId: string }, {}, ReactionRequestBody>,
    res: Response
  ): Promise<void> {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove reaction
  async removeReaction(
    req: Request<{ thoughtId: string; reactionId: string }>,
    res: Response
  ): Promise<void> {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default thoughtController;

import { Request, Response } from "express";
import { UserService } from "../services/userService";

const user_service = new UserService();

class UserController {
  createUser = async (req: Request, res: Response) => {
    try {
      const { username, password, profile } = req.body;
      const newUser = await user_service.createUser(username, password, profile);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const users = await user_service.getUser();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  getUserByUsername = async (req: Request, res: Response) => {
    try {
      const username = req.params.username;
      const user = await user_service.getUserByUsername(username);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    try {
      const user = await user_service.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      const user = await user_service.updateUser(id, updateData);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const user = await user_service.deleteUser(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
}

export default new UserController();

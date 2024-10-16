import { Request, Response } from "express";
import { LoginService } from "../services/loginService";

class loginController {
  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await new LoginService().login(username, password);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
}

export default new loginController();

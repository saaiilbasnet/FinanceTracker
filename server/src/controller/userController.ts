import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import User from "../database/models/userModel";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

class UserController {
  // GET /api/user/me - Get current user profile
  static async getProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = await User.findByPk(req.user?.id, {
        attributes: ["id", "username", "email", "createdAt"],
      });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  // PUT /api/user/me - Update username/email
  static async updateProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { username, email } = req.body;
      const userId = req.user?.id;

      if (!username && !email) {
        res.status(400).json({ message: "Please provide username or email to update" });
        return;
      }

      // Check if username/email already taken by another user
      if (username || email) {
        const existingUser = await User.findOne({
          where: {
            [Op.and]: [
              { id: { [Op.ne]: userId } },
              {
                [Op.or]: [
                  ...(username ? [{ username }] : []),
                  ...(email ? [{ email }] : []),
                ],
              },
            ],
          },
        });

        if (existingUser) {
          const field = existingUser.username === username ? "Username" : "Email";
          res.status(400).json({ message: `${field} already taken` });
          return;
        }
      }

      // Update user
      await User.update(
        {
          ...(username && { username }),
          ...(email && { email }),
        },
        { where: { id: userId } }
      );

      // Fetch updated user
      const updatedUser = await User.findByPk(userId, {
        attributes: ["id", "username", "email", "createdAt"],
      });

      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  // PUT /api/user/change-password
  static async changePassword(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user?.id;

      if (!currentPassword || !newPassword) {
        res.status(400).json({ message: "Please provide current and new password" });
        return;
      }

      if (newPassword.length < 6) {
        res.status(400).json({ message: "New password must be at least 6 characters" });
        return;
      }

      // Get user with password
      const user = await User.findByPk(userId);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Verify current password
      const isMatch = bcrypt.compareSync(currentPassword, user.password);

      if (!isMatch) {
        res.status(401).json({ message: "Current password is incorrect" });
        return;
      }

      // Hash new password and update
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      await User.update({ password: hashedPassword }, { where: { id: userId } });

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }

  // DELETE /api/user/me - Delete account
  static async deleteAccount(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { password } = req.body;
      const userId = req.user?.id;

      if (!password) {
        res.status(400).json({ message: "Please provide password to confirm deletion" });
        return;
      }

      // Get user with password
      const user = await User.findByPk(userId);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Verify password
      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        res.status(401).json({ message: "Incorrect password" });
        return;
      }

      // Delete user
      await User.destroy({ where: { id: userId } });

      res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
}

export default UserController;
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const guestOrUser = async (req, res, next) => {
  try {
    let token = null;

    // 1. If Bearer token exists → verify & set user
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        
        req.user = await User.findByPk(decoded.id, {
            attributes: ["id", "email"],
        });
        console.log('here: ',req.user);
      } catch (err) {
        req.user = null;
      }
    }

    
    if (!req.user) {
      const guestId = req.cookies?.guestId;
      req.guestId = guestId || null;
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Auth middleware error", error });
  }
};

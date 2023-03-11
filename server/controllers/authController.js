import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// registering new user
export const registerNewUser = async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  req.body.password = hashedPassword;
  const newUser = new userModel(req.body);

  try {
    const user = await userModel.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const registeredNewUser = await newUser.save();
    const token = jwt.sign(
      { username: registeredNewUser.username, id: registeredNewUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ newUser, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// login user

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch {
    res.status(500).json(error.message);
  }
};

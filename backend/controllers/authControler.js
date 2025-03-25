import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModels from "../models/userModels.js";
import JWT from 'jsonwebtoken'

export const registerController = async (req, res) => {
  try {
    const { name, email, password, age, gender } = req.body;

    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ error: "Password is required" });
    }
    const existingUser = await userModels.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ error: "User already exists. Please login" });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new userModels({ name, email, age, gender, password: hashedPassword }).save();
    return res.status(201).send({
      user: {
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        id: user._id,
      },
    });

  } catch (error) {
    return res.status(500).send({
      error: error.message || "Error in registration",
    });
  }
};


export const loginController = async (req, res) => {
  try {
      const { email, password } = req.body;
      if (!email || !password) {
          return res.status(400).send({ error: "Invalid email or password" });
      }
      const user = await userModels.findOne({ email });
      if (!user) {
          return res.status(404).send({ error: "User has not registered" });
      }

      const match = await comparePassword(password, user.password);
      if (!match) {
          return res.status(401).send({ error: "Invalid login credentials" });
      }
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).send({
          user: {
              name: user.name,
              email: user.email,
              gender: user.gender,
              age: user.age,
              id: user._id
          },
          token
      });

  } catch (error) {
      return res.status(500).send({
          error: error.message || "Error in login"
      });
  }
};



export const updateControler = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send({
        error: "Unauthorized: User not authenticated",
      });
    }

    const { name, email, age, gender } = req.body;
    const user = await userModels.findById(req.user._id);
    const updatedUser = await userModels.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        gender: gender || user.gender,
        age: age !== undefined ? age : user.age,
      },
      { new: true }
    );
    res.status(200).send({
      updatedUser,
    });
  } catch (error) {
    res.status(400).send({
      error: "Error While Updating Profile",
    });
  }
};

  

export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModels.find({}, '-password');
    res.status(200).send({
      users,
    });
  } catch (error) {
    res.status(500).send({
      error: "Error fetching users",
    });
  }
};

  

  export const testMiddleware=(req,res)=>{
      return res.send("Protected Route")
  }
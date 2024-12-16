const User = require("../model/user.model");

const getUser = async (req, res) => {
  try {
    let user = await User.find();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findById(id);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    } else {
      let { email } = req.body;
      let isExist = await User.findOne({ email: email });
      if (isExist) {
        return res.status(400).json({ error: "Email already exists" });
      } else {
        let user = await User.create(req.body);
        res.status(201).send(user);
      }
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findByIdAndDelete(id);
    res.status(201).json("User deleted successfully", user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let isExist = await User.findOne({ email: email });
    if (!isExist) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    if (isExist.password != password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.cookie("id", isExist.id);
    return res.redirect("/movies");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signupPage = async (req, res) => {
  res.render("signup");
};

const loginPage = async (req, res) => {
  res.render("login");
};

module.exports = {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  loginPage,
  signupPage,
};

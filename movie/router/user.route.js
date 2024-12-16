const { Router } = require("express");
const {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  loginPage,
  signupPage,
} = require("../controller/user.controller");

const userRouter = Router();

userRouter.get("/login", loginPage);
userRouter.get("/signup", signupPage);

userRouter.get("/", getUser);
userRouter.get("/:id", getUserById);
userRouter.post("/signup", createUser);
userRouter.patch("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);

userRouter.post("/login", login);

module.exports = userRouter;

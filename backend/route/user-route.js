const express = require('express');
const { getAllUser,updateName,updatePassword,login, signin }= require( "../controller/user-controller");

const userRouter = express.Router();

userRouter.get("/get-user", getAllUser);
userRouter.put("/update-name/:id", updateName);
userRouter.put("/update-password/:id", updatePassword);
userRouter.post("/signin", signin);
userRouter.post("/login", login);
module.exports = userRouter;
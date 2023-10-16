const User =require("../model/User");
const bcrypt =require("bcryptjs");

const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(204).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};


const updateName = async (req, res, next) => {
  const { name} = req.body;
  const userId = req.params.id;
  let user;
  try {
    user = await User.findByIdAndUpdate(userId, {
      name    
    });
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(200).json({sucess:false, message: "Unable To Update The User Name" });
  }
  return res.status(200).json({sucess:true, user });
};

const updatePassword = async (req, res, next) => {
  const { previous, newPassword } = req.body;
  const userId = req.params.id;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  const isPasswordCorrect = bcrypt.compareSync(previous, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ success: false, message: "Previous password is incorrect" });
  }
  const hashedPassword = bcrypt.hashSync(newPassword);
  user.password = hashedPassword;

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }

  return res.status(200).json({ success: true, message: "Password updated successfully" });
};


const signin = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res
      .status(200)
      .json({ message: "User Already Exists! Login Instead" });
  }
  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({sucess:true, user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(200).json({ message: "Couldnt Find User By This Email" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(200).json({ message: "Incorrect Password" });
  }
  return res
    .status(200)
    .json({sucess:true, message: "Login Successfull", user: existingUser });
};
module.exports={
  getAllUser,
  updateName,
  updatePassword,
  signin,
  login
}
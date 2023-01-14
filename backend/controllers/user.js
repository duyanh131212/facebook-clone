const User = require("../models/User");
const {
  validateEmail,
  validateLength,
  validateUserName,
} = require("../helpers/validation");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      user_name,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email address",
      });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res
        .status(400)
        .json({ message: "Email already exists, try another email address" });
    }

    if (!validateLength(first_name, 3, 20)) {
      return res
        .status(400)
        .json({ message: "First name must be between 3 and 20 characters" });
    }

    if (!validateLength(last_name, 3, 20)) {
      return res
        .status(400)
        .json({ message: "Last name must be between 3 and 20 characters" });
    }

    if (!validateLength(password, 8, 40)) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    let temp = first_name + last_name;
    let newe = await validateUserName(temp);

    const user = await new User({
      first_name,
      last_name,
      user_name: newe,
      email,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      {
        id: user._id.toString(),
      },
      "30m"
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);

    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.user_name,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message:
        "Registration successful, please check your email to verify your account",
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.activateAccount = async (req, res) => {
  const { token } = req.body;
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  console.log(user);
  const check = await User.findById(user.id);
  console.log(check);
  console.log(check.verified);
  if (check.verified === "true") {
    return res.status(400).json({ message: "Account already verified." });
  } else {
    await User.findByIdAndUpdate(user.id, { verified: "true" });
    return res.status(200).json({ message: "Account verification completed." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res
        .status(400)
        .json({ message: "Password is incorrect. Try again" });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.user_name,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Login successful",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

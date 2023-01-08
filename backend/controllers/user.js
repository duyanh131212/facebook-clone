const User = require("../models/User");
const {
  validateEmail,
  validateLength,
  validateUserName,
} = require("../helpers/validation");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");

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
    console.log(emailVerificationToken);

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

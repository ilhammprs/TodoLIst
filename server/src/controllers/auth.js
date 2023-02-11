const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

exports.register = async (req, res) => {
  const { name, phone, email, username, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).send({
        status: "failed",
        message: "Email already exists",
      });

      user = new User({
        name,
        phone,
        email,
        username,
        password,
      });
      
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      
      await user.save();
      
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY);
      
      res.status(200).send({
        status: "success...",
        data: {
          name: user.name,
          phone: user.phone,
          email: user.email,
          username: user.username,
          token,
        },
      });
      
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user)
      return res.status(400).send({
        status: "failed",
        message: "Username or password is invalid",
      });

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid)
        return res.status(400).send({
          status: "failed",
          message: "Username or password is invalid",
        });
      
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY);
      
      res.status(200).send({
        status: "success...",
        data: {
          id: user.id,
          name: user.name,
          username: user.username,
          phone: user.phone,
          email: user.email,
          token,
        },
      });
      
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

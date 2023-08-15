import mongoose from "mongoose";
import User from "../model/user.model.js";

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    res.status(500).json({
      success: false,
      msg: "All Fields Required",
    });
  }
  const avatar = `https://ui-avatars.com/api/?name=${firstName}+${lastName}`;

  try {
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      avatar,
      userLinks:[]
    });

    await user.save();

    res.status(200).json({
      success: true,
      msg: "Account Created Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Something Went Wrong",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      success: false,
      msg: "All Fields Required",
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    const passwordMatched = await user.comparePassword(password);
    if (passwordMatched) {
      const jwtToken = user.generateJwtToken();

      res.cookie("jwtToken", jwtToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });


      res.status(200).json({
        success: true,
        msg: "LoggedIn Successfully",
        jwtToken,
      });

    } else {
      res.status(400).json({
        success: false,
        msg: "Password Not Matched",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      msg: "User Not Found, Please Register First",
    });
    return;
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwtToken", null, {
      secure: true,
      maxAge: 0,
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      msg: "User logged out successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "Error In LogOut",
    });
  }
};

const dashboard = async (req, res)=>{
    const id = req.user.id;
     const data = await User.findById(id).populate("userLinks.link")
     res.status(200).json({
        success:true,
        msg: "Welcome To Dashboard",
        data
    })

}

export { signup, login, dashboard, logout };

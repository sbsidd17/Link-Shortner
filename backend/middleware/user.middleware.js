import jwt from "jsonwebtoken";
import "dotenv/config";

const isLogin = (req, res, next) => {
  const {jwtToken} = req.body;

  if (!jwtToken) {
    res.status(400).json({
      success: false,
      msg: "Not Aurthorised, Please Login First",
    });
    return
  }

  try {
    const decode = jwt.verify(jwtToken, process.env.JWT_SECRATE);
    req.user = decode;
    next()
  } catch (error) {
    res.status(500).json({
        success:false,
        msg: "Something Went Wrong",
        error:error.message
    })
  }
};

export {
    isLogin
}

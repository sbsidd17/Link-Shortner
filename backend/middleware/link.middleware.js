import jwt from "jsonwebtoken";
import "dotenv/config";

const isUser = (req, res, next) => {
  const jwtToken = req.cookies.jwtToken;

  if (jwtToken) {
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
  }else{
    next()
  }
};

export {
    isUser
}

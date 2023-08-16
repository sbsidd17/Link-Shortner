import jwt from "jsonwebtoken";
import "dotenv/config";

const isUser = (req, res, next) => {
  const {jwtToken} = req.body;

  if (jwtToken) {
    console.log("token receved")
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
    console.log("token not found")
    next()
  }
};

export {
    isUser
}

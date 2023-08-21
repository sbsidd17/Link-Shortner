import jwt from "jsonwebtoken";
const isAdmin = (req, res, next) => {
    const jwtToken = req.cookies.jwtToken || req.body.jwtToken;
  
    if (!jwtToken) {
      res.status(400).json({
        success: false,
        msg: "Not Aurthorised, Please Login First",
      });
      return;
    }
  
    try {
      const decode = jwt.verify(jwtToken, process.env.JWT_SECRATE);
      
      if(decode.role === "admin"){
        req.user = decode;
        next();
      }else{
        res.status(400).json({
          sucess:false,
          msg: "You are not admin"
        })
        return;
      }
      
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: "Something Went Wrong",
        error: error.message,
      });
    }
  };

  export {
    isAdmin
  }
const jwt = require("jsonwebtoken");
module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    // console.log(token);
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      console.log(process.env.JWT_KEY);

      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Invalid Token..."
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Access Denied! Unauthorized User"
      });
    }
  },
  ApiAutheticateToken: (req, res, next) => {
    let token = req.get("authorization");
    // console.log(token);
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      console.log(process.env.JWT_KEY);
      if (token !== process.env.JWT_KEY) {
        return res.json({
          success: 0,
          message: "Invalid Token..."
        });
      } else {
        req.decoded = token;
        next();
      }

    } else {
      return res.json({
        success: 0,
        message: "Access Denied! Unauthorized User"
      });
    }
  }
};
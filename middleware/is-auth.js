const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1]; //Bearer hsjfsjdhfwgreyuijfb

  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let decodedTken;
  try {
    decodedTken = jwt.verify(token, "somesupersecretkey");
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedTken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedTken.userId;
  next();
};

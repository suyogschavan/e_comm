const jwt = require("jsonwebtoken");

// const config = process.env;

function getToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}


// Middleware to extract user information from the token
const authenticateUser = async (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized - Token not provided." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.secret); 
    req.user = {
      userId: decodedToken.userId,
      userType: decodedToken.userType,
    };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Unauthorized - Invalid token." });
  }
};

module.exports = authenticateUser;

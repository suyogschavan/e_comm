const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
  const temp = req.headers.authorization;
  if(!temp){return res.status(401).json({ error: 'Unauthorized - Token not provided.' });}

  const token = req.headers.authorization.split(' ')[1];

  // if (!token) {
  //   return res.status(401).json({ error: 'Unauthorized - Token not provided.' });
  // }

  // console.log('Received Token:', token);

  try {
    const decodedToken = jwt.verify(token, process.env.secret); 
    // console.log('Decoded Token:', decodedToken);
    req.user = {
      userId: decodedToken.user._id,
      userType: decodedToken.user.type,
    };
    // console.log('req.user:', req.user);
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token.' });
  }
};


module.exports = authenticateUser;
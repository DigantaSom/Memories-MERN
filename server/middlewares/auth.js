import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  // console.log(req.headers);
  try {
    // this token is set in the HTTP headers (of each request) from the client
    const token = req.headers.authorization.split(' ')[1]; // token: "Bearer <token string>"
    const isCustomAuth = token.length < 500; // our token or Google OAuth token

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedData?.id;
    } else if (token && !isCustomAuth) {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;

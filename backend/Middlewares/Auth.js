const jwt = require("jsonwebtoken");

const userVerification =
(req, res, next) => {

  const token =
    req.cookies.token;

  if (!token) {
    return res.json({
      status: false
    });
  }

  try {

    const decoded =
      jwt.verify(
        token,
        process.env.TOKEN_KEY
      );

    req.userId =
      decoded.id;

    next();

  } catch (error) {

    return res.json({
      status: false
    });

  }
};

module.exports =
userVerification;
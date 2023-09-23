const verify = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    res.status(401).json({ message: "Access denied, No Authorization." });
  }
  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verify;

const { AppError } = require("../errors/AppError");

module.exports = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(err.errorCode);
  }

  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
};

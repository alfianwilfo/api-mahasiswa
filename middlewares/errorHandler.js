let errorHandler = (err, req, res, next) => {
  let status = 500;
  let msg = "Internal server error";
  switch (err.name) {
    case "validator":
      status = err.status;
      msg = err.msg;
      break;
    case "SequelizeUniqueConstraintError":
      status: 400;
      msg = err.errors[0].message;
      break;
  }
  res.status(status).json({ message: msg });
};

module.exports = errorHandler;

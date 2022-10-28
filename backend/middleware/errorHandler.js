const errorHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      message: 'User not authorized',
    });
  }

  if (err.name === 'ValidationError') {
    res.status(401).json({
      message: err,
    });
  }

  return res.status(500).json(err);
  // const statusCode = res.statusCode ? res.statusCode : 500;
  // res.status(statusCode);
  // res.json({
  //   message: err.message,
  //   stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  // });
  // next();
};

module.exports = errorHandler;

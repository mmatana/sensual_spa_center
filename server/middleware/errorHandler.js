const errorHandler = logger => {
  return (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message;
    logger.error({
      defaultResponse: {
        errorMessage: message,
        code: status,
        successful: false
      }
    });

    return res.status(status).json({
      defaultResponse: {
        errorMessage: message,
        code: status,
        successful: false
      }
    });
  };
};

module.exports = { errorHandler };

exports.successResponse = function (res, msg) {
  var data = {
    success: true,
    message: msg
  };
  return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
  var resData = {
    success: true,
    message: msg,
    data: data
  };
  return res.status(200).json(resData);
};

exports.ErrorResponse = function (res, msg) {
  var data = {
    success: false,
    message: msg
  };
  return res.json(data);
};

exports.notFoundResponse = function (res, msg) {
  var data = {
    success: false,
    message: msg
  };
  return res.json(data);
};

exports.validationError = function (res, msg) {
  var resData = {
    success: false,
    message: msg
  };
  return res.json(resData);
};

exports.validationErrorWithData = function (res, msg, data) {
  var resData = {
    success: false,
    message: msg,
    data: data
  };
  return res.json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
  var data = {
    success: false,
    message: msg
  };
  return res.json(data);
};

exports.noUserFound = function (res, msg) {
  var data = {
    success: false,
    message: msg
  };
  return res.json(data);
};

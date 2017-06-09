exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next); // pass errors into next
  };
};

exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err.stack
  });
};

exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
};
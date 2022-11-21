import { StatusCodes } from 'http-status-codes';
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong! Try again later.',
  };

  if (err.code && err.code === 11000) {
    customError.msg = `${Object.keys(err.keyValue).toString().charAt(0).toUpperCase()} is already present. Please Enter an other ${Object.keys(err.keyValue)}.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name && err.name === 'ValidationError') {
    const errorFields = Object.keys(err.errors);
    const errorMessage =
      'Please provide ' +
      errorFields
        .map((item) => {
          return item;
        })
        .join(' and ') +
      ' to continue!';
    console.log(errorMessage);
    customError.msg = errorMessage;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name && err.name === 'CastError') {
    customError.msg = `No item dound with Id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;

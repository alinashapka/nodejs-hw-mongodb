import { isHttpError } from 'http-errors';

export function errorHandler(err, req, res, next) {
  if (isHttpError(err) === true) {
    return res
      .status(err.statusCode)
      .json({ status: err.statusCode, message: err.message });
  }

  console.error(err);

  res
    .status(500)
    .json({ status: 500, message: 'Something went wrong', data: err.message });
}

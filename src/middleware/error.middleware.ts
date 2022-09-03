import { ErrorRequestHandler } from "express"

/**
 * 500 response & log when errors are raised.
 */
const errorMiddleware: ErrorRequestHandler = (err, req, res) => {
  console.error(err)
  return res.status(500).json({
    message: `${err}`,
  })
}

export default errorMiddleware

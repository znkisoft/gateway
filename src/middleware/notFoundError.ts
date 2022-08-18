import { RequestHandler } from "express"

/**
 * JSON 404 response
 */
const NotFoundError: RequestHandler = (req, res) => {
  return res.status(404).json({ message: "not found" })
}

export default NotFoundError

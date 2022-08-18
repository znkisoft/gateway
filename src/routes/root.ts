import express from "express"
import getRoot from "../controllers/root/getRoot"
import postRoot from "../controllers/root/postRoot"

const root = express.Router()

root.get("/", getRoot)
root.post("/", postRoot)

// check health
root.get("/health/filesrv", (req, res) => {
  res.send("OK")
})

root.get("/health/slave", (req, res) => {
  res.send("OK")
})

// file server proxy

// slave server proxy

export default root

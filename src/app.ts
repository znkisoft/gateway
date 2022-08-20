import cors from "cors"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import config from "./config"
import errorHandler from "./middleware/errorHandler"
import NotFoundError from "./middleware/notFoundError"
import {
  SrvWatchdogHealthRoute,
  SrvWatchdogRoute,
} from "./routes/watchdogsrv.route"
import { SrvSlaveHealthRoute, SrvSlaveRoute } from "./routes/slavesrv.route"

const app = express()

// Apply most middleware first
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    // @ts-ignore
    origin: config.clientOrigins[config.nodeEnv],
  }),
)
app.use(helmet())
app.use(morgan("tiny"))

app.use("/health/watchdogsrv", SrvWatchdogHealthRoute)
app.use("/health/slavesrv", SrvSlaveHealthRoute)
app.use("/health/self", (req, res) => {
  res.json("gateway service is healthy")
})

// TODO auth middleware

// proxies
app.use("/api/watchdogsrv", SrvWatchdogRoute)
app.use("/api/slavesrv", SrvSlaveRoute)

app.use(NotFoundError)
app.use(errorHandler)

export default app

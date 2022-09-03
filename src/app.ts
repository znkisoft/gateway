import cors from "cors"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import config from "./config"
import ErrorMiddleware from "./middleware/error.middleware"
import NotFoundMiddleware from "./middleware/notFound.middleware"
import {
  SrvWatchdogHealthRoute,
  SrvWatchdogRoute,
} from "./routes/watchdogsrv.route"
import { SrvSlaveHealthRoute, SrvSlaveRoute } from "./routes/slavesrv.route"
import path from "path"

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

// serve static files
app.use(express.static(path.join(__dirname, "..", "public")))

app.use("/health/watchdogsrv", SrvWatchdogHealthRoute)
app.use("/health/slavesrv", SrvSlaveHealthRoute)
app.use("/health/self", (req, res) => {
  res.json("gateway service is healthy")
})

// TODO auth middleware

// proxies
app.use("/api/watchdogsrv", SrvWatchdogRoute)
app.use("/api/slavesrv", SrvSlaveRoute)

app.use(NotFoundMiddleware)
app.use(ErrorMiddleware)

export default app

import dotenv from "dotenv"
dotenv.config()
import packageJson from "../package.json"

const config = {
  version: packageJson.version,
  name: packageJson.name,
  description: packageJson.description,
  nodeEnv: process.env["NODE_ENV"] ?? "development",
  port: process.env["PORT"] ?? 4000,
  clientOrigins: {
    development: process.env["DEV_ORIGIN"] ?? "*",
    production: process.env["PROD_ORIGIN"] ?? "none",
  },
  srvWatchdog: {
    url: process.env["SRV_WATCHDOG_URL"] ?? "http://localhost:3020",
  },
  srvSlave: {
    url: process.env["SRV_SLAVE_URL"] ?? "http://localhost:3030",
  },
}

export default config

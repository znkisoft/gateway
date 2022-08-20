import { createProxyMiddleware } from "http-proxy-middleware"
import config from "../config"

export const SrvWatchdogHealthRoute = createProxyMiddleware(
  "/health/watchdogsrv",
  {
    changeOrigin: true,
    target: config.srvWatchdog.url,
    pathRewrite: {
      "/health/watchdogsrv": "/api/health",
    },
  },
)

export const SrvWatchdogRoute = createProxyMiddleware("/health/watchdogsrv", {
  changeOrigin: true,
  target: config.srvWatchdog.url,
  pathRewrite: {
    "^/api/watchdogsrv": "/api",
  },
})

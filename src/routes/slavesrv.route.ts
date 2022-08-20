import { createProxyMiddleware } from "http-proxy-middleware"
import config from "../config"

export const SrvSlaveHealthRoute = createProxyMiddleware({
  changeOrigin: true,
  target: config.srvSlave.url,
  pathRewrite: {
    "^/health/slavesrv": "/api/health",
  },
})

export const SrvSlaveRoute = createProxyMiddleware({
  changeOrigin: true,
  target: config.srvSlave.url,
  pathRewrite: {
    "^/api/slavesrv": "/api",
  },
})

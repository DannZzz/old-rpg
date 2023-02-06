import cors from "@koa/cors"
import Router from "@koa/router"
import DataRouter from "./routers/private/data.js"
import RedirectRouter from "./routers/private/redirects.js"

const ApiRouter = new Router({ prefix: "/api/v1" })

ApiRouter.use(
  "/private",
  cors(),
  RedirectRouter.routes(),
  RedirectRouter.allowedMethods()
)

ApiRouter.use(
  "/private",
  cors(),
  DataRouter.routes(),
  DataRouter.allowedMethods()
)

export default ApiRouter

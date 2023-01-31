import Router from "@koa/router"
import HeroPublicRouter from "./routers/public/hero-public"

const ApiRouter = new Router({ prefix: "/api/v1" })

ApiRouter.use(
  "/public",
  HeroPublicRouter.routes(),
  HeroPublicRouter.allowedMethods()
)

export default ApiRouter

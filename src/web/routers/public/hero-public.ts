import Router from "@koa/router"
import send from "koa-send"

const HeroPublicRouter = new Router({ prefix: "/hero" })

HeroPublicRouter.get("/avatar/:dir/(.*)", async (ctx) => {
  await send(ctx, ctx.params.dir + "/" + ctx.path.split("/").at(-1), {
    immutable: true,
    root: "./hero-images",
  })
})

export default HeroPublicRouter

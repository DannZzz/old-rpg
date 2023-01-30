import Koa from "koa"
import { PORT } from "./config"
import HeroHandler from "./handlers/hero-etc"
import ApiRouter from "./web/all"

const app = new Koa()

app.use(ApiRouter.routes()).use(ApiRouter.allowedMethods())

app.listen(PORT, async () => {
  await HeroHandler()
  console.log(`Server listening on http://localhost:${PORT}`)
})

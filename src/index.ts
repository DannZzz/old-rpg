import Koa from "koa"
import mongoose from "mongoose"
import { MONGO_URI, PORT } from "./config"
import HeroHandler from "./handlers/hero-etc"
import ApiRouter from "./web/api"

const app = new Koa()

app.use(ApiRouter.routes()).use(ApiRouter.allowedMethods())

app.listen(PORT, async () => {
  await HeroHandler()
  console.log("Handlers ended")
  mongoose.connect(MONGO_URI).then(() => {
    console.log("Database connected")
  })
  console.log(`Server listening on http://localhost:${PORT}`)
})

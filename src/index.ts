import Koa from "koa"
import { PORT } from "./config.js"
import connectMongo from "./database/connect.js"
import ApiRouter from "./web/api.js"
import http from "http"
import { Server } from "socket.io"
import connectSocketServer from "./io/connectSocket.js"

const app = new Koa()

app.use(ApiRouter.routes()).use(ApiRouter.allowedMethods())

const server = http.createServer(app.callback())

connectSocketServer(server)

server.listen(PORT, async () => {
  console.log("Handlers ended")
  connectMongo()

  console.log(`Server listening on http://localhost:${PORT}`)
})

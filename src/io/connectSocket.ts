import { Server } from "http"
import { Server as SocketServer } from "socket.io"

export default function connectSocketServer(server: Server) {
  const io = new SocketServer(server)

  io.on("connection", (socket) => {
    /* … */
    console.log(`Socket with Id ${socket.id} connected ❤️‍🔥`)

    socket.on("disconnect", () => {
      console.log(`Socket with Id ${socket.id} disconnected 💣`)
    })
  })
}

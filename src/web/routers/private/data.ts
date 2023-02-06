import Router from "@koa/router"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import Database from "../../../database/db.js"

const DataRouter = new Router({ prefix: "/data" })

DataRouter.get("/users", async (ctx) => {
  const access_token = ctx.query.access_token as string

  const authData = await Database.get("Auth").findOne("token", access_token)
  if (!authData) {
    ctx.status = StatusCodes.UNAUTHORIZED
    ctx.message = ReasonPhrases.UNAUTHORIZED
    return
  }
  ctx.type = "application/json"
  ctx.body = JSON.stringify(
    (await Database.get("User").findOne("specId", authData._id)).json()
  )
})

export default DataRouter

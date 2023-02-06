import Router from "@koa/router"
import { uuid } from "anytool"
import DiscordOauth2 from "discord-oauth2"
import { StatusCodes } from "http-status-codes"
import { DevFrontName, DiscordOauth } from "../../../config.js"
import Database from "../../../database/db.js"
import { SpecId } from "../../../database/models/Auth.js"

const discord_oauth2 = new DiscordOauth2({
  ...DiscordOauth,
  credentials: Buffer.from(Object.values(DiscordOauth).join(":")).toString(
    "base64"
  ),
  redirectUri: `${DevFrontName}/api/ds/redirect`,
})

const RedirectRouter = new Router({ prefix: "/redirect" })

RedirectRouter.get("/discord", async (ctx) => {
  const code = ctx.query.code as string
  try {
    const token_res = await discord_oauth2.tokenRequest({
      code,
      scope: "identify email",
      grantType: "authorization_code",
    })

    const userData = await discord_oauth2.getUser(token_res.access_token)

    const specId: SpecId = `discord ${userData.id}`

    await Database.get("Auth").deleteOne({ specId })
    const token = await Database.generateUnique("Auth", "token", () => uuid(30))
    await Database.get("Auth").createOne({
      _id: specId,
      token,
      expireIn: new Date(),
    })
    await Database.createUserOrGet({ specId })

    ctx.status = StatusCodes.OK
    ctx.body = token
  } catch (e) {
    console.log(e)
    ctx.status = StatusCodes.BAD_REQUEST
    ctx.body = { error: "unexpected error" }
  }
})

RedirectRouter.get("/google", async (ctx) => {
  const id = ctx.query.id as string
  try {
    const specId: SpecId = `google ${id}`

    await Database.get("Auth").deleteOne({ specId })
    const token = await Database.generateUnique("Auth", "token", () => uuid(30))
    await Database.get("Auth").createOne({
      _id: specId,
      token,
      expireIn: new Date(),
    })
    await Database.createUserOrGet({ specId })

    ctx.status = StatusCodes.OK
    ctx.body = token
    // ctx.redirect("/")
  } catch (e) {
    console.log(e)
    ctx.status = StatusCodes.BAD_REQUEST
    ctx.body = { error: "unexpected error" }
  }
})

export default RedirectRouter

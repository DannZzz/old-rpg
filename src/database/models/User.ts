import { randomNumber } from "anytool"
import mongoose from "mongoose"
import { ObjectType } from "../../@types/typing.js"
import { SpecId } from "./Auth.js"

export type UserCooldownKeys = "usernameChange"

export interface User {
  _id: string
  specId: SpecId
  username?: string
  cooldowns?: ObjectType<UserCooldownKeys, Date>
}

export const User = mongoose.model(
  "user",
  new mongoose.Schema<User>({
    _id: String,
    specId: String,
    username: {
      type: String,
      default: () => `unnamed#${randomNumber(0, 90000000)}`,
    },
    cooldowns: { type: Object, default: {} },
  })
)

export const UserKeys: readonly (keyof User)[] = [
  "_id",
  "username",
  "specId",
  "cooldowns",
]
export const UserKeysApi: readonly (keyof User)[] = ["_id"]

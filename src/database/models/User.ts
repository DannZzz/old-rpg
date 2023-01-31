import mongoose from "mongoose"
import { ObjectType } from "../../game/typing/any"

export type UserCooldownKeys =
  | "daily"
  | "adventures"
  | "rating"
  | "usernameChange"
export interface User {
  _id: string
  secondary?: number
  primary?: number
  cooldowns?: ObjectType<UserCooldownKeys, Date>
  vipUntil?: Date
}

export const User = mongoose.model(
  "user",
  new mongoose.Schema<User>({
    _id: String,
    secondary: { type: Number, default: 0 },
    primary: { type: Number, default: 0 },
    cooldowns: { type: Object, default: {} },
    vipUntil: { type: Date, default: null },
  })
)

export const UserKeys: readonly (keyof User)[] = [
  "_id",
  "secondary",
  "cooldowns",
  "primary",
  "vipUntil",
]
export const UserKeysApi: readonly (keyof User)[] = ["_id", "vipUntil"]

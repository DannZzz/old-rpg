import mongoose from "mongoose"

export type SpecId = `${"discord" | "google"} ${string}`

export interface Auth {
  _id: SpecId
  token: string
  expireIn: Date
}

export const Auth = mongoose.model(
  "auth",
  new mongoose.Schema<Auth>({
    _id: String,
    token: { type: String, unique: true },
    expireIn: Date,
  })
)

export const AuthKeys: readonly (keyof Auth)[] = ["_id", "expireIn", "token"]
export const AuthKeysApi: readonly (keyof Auth)[] = []

declare module Game {
  export type SpecId = `${"discord" | "google"} ${string}`

  export type UserCooldownKeys = "usernameChange"
  export interface User {
    _id: string
    specId: SpecId
    username?: string
    cooldowns?: ObjectTypy<UserCooldownKeys, Date>
  }
}

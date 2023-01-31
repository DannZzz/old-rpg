import mongoose from "mongoose"
import HeroName from "../../configuration/HeroNaming"
import { PackName } from "../../game/packs/Packs"
import { ObjectType } from "../../game/typing/any"
import { HeroAttribute } from "../../heroes/typing/Other"

export interface MongoHero {
  skin: string
  skinsHave: string[]
  xp: number
  games: number
  wins: number
  attr: HeroAttribute
}

export interface Game {
  _id: string
  heroes?: ObjectType<HeroName, MongoHero>
  xp?: number
  adventures?: number
  levelBonusAttr?: HeroAttribute
  packs?: ObjectType<PackName, number, true>
}

export const Game = mongoose.model(
  "game",
  new mongoose.Schema<Game>({
    _id: String,
    heroes: { type: Object, default: {} },
    levelBonusAttr: { type: Object, default: {} },
    xp: { type: Number, default: 0 },
    adventures: { type: Number, default: 0 },
    packs: { type: Object, default: {} },
  })
)

export const GameKeys: readonly (keyof Game)[] = [
  "_id",
  "heroes",
  "xp",
  "adventures",
  "levelBonusAttr",
  "packs",
]
export const GameKeysApi: readonly (keyof Game)[] = [
  "_id",
  "heroes",
  "xp",
  "adventures",
]

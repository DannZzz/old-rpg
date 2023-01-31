import { FilterQuery, UpdateQuery, Model as MongooseModel } from "mongoose"
import {
  MaxNicknameLength,
  GameDatabaseOptions,
} from "../configuration/any-config"
import HeroName from "../configuration/HeroNaming"
import { PackName, Packs } from "../game/packs/Packs"
import Heroes from "../heroes/Heroes"
import { HeroAttribute } from "../heroes/typing/Other"
import Utils from "../utils/main"
import { CustomEvent } from "../utils/structures/CustomEvent"
import { Game, GameKeys, MongoHero } from "./models/Game"
import { Settings, SettingsKeys } from "./models/Settings"
import { User, UserKeys } from "./models/User"

const { ObjectFromKeys } = Utils

interface models {
  User: User
  Settings: Settings
  Game: Game
}

const models: { [k in keyof models]: MongooseModel<models[k]> } = {
  User,
  Game,
  Settings,
}

const keys = {
  UserKeys,
  SettingsKeys,
  GameKeys,
}

export default class Database {
  static async updatePack(userId: string, packId: PackName, amount: number) {
    const user = await this.get("Game").findOrCreate("_id", userId)
    const packs = Packs.resolveUserPacks(user.packs)
    if (packs[packId]) {
      await this.get("Game").updateOne(
        { _id: userId },
        { $inc: { [`packs.${packId}`]: Math.round(amount) } }
      )
      return Math.round((packs?.[packId]?.[0] || 0) + amount)
    } else {
      await this.get("Game").updateOne(
        { _id: userId },
        { $set: { [`packs.${packId}`]: Math.round(amount) } }
      )
      return Math.round((packs?.[packId]?.[0] || 0) + amount)
    }
  }

  //   static async changeMoney<K extends keyof CurrencyType>(data: {
  //     targetId: string
  //     amount: number
  //     type: K
  //     moneyType: keyof CurrencyType[K]
  //     CustomEvent?: CustomEvent
  //   }) {
  //     await Database.get(data.type === "user" ? "User" : "Guild").findOrCreate(
  //       "_id",
  //       data.targetId
  //     )
  //     await Database.get(data.type === "user" ? "User" : "Guild").updateOne(
  //       { _id: data.targetId },
  //       { $inc: { [data.moneyType]: Math.round(data.amount) } }
  //     )
  //     if (data.CustomEvent)
  //       data.CustomEvent.emit("moneyChange", {
  //         targetId: data.targetId,
  //         type: data.type,
  //         moneyType: data.moneyType,
  //         amount: Math.round(data.amount),
  //       })
  //   }

  static get<K extends keyof models>(modelName: K): Model<K, models[K]> {
    return new Model(modelName)
  }

  /**
   * Add xp too him
   *
   * @param userId user id
   * @param heroId hero id (name)
   * @param xp xp number to add
   * @returns given xp + hero's xp
   */
  static async addHeroXp(
    userId: string,
    heroId: HeroName,
    xp: number
  ): Promise<number> {
    const thisUserGame = await Database.get("Game").findOrCreate("_id", userId)
    if (!thisUserGame.heroes[heroId]) return null
    if (thisUserGame.heroes[heroId].xp) {
      if (xp < 0 && thisUserGame.heroes[heroId].xp + xp < 0) {
        await Database.get("Game").updateOne(
          { _id: userId },
          { $set: { [`heroes.${heroId}.xp`]: 0 } }
        )
        return 0
      }
      await Database.get("Game").updateOne(
        { _id: userId },
        { $inc: { [`heroes.${heroId}.xp`]: Math.round(xp) } }
      )
      return Math.round(thisUserGame.heroes[heroId].xp + xp)
    }
    if (xp < 0) {
      await Database.get("Game").updateOne(
        { _id: userId },
        { $set: { [`heroes.${heroId}.xp`]: 0 } }
      )
      return 0
    }
    await Database.get("Game").updateOne(
      { _id: userId },
      { $set: { [`heroes.${heroId}.xp`]: Math.round(xp) } }
    )
    return Math.round(xp)
  }

  static async addUserXp(userId: string, xp: number, CustomEvent: CustomEvent) {
    const thisUserGame = await Database.get("Game").findOrCreate("_id", userId)
    if (xp < 0 && thisUserGame.xp + xp < 0) {
      await Database.get("Game").updateOne({ _id: userId }, { $set: { xp: 0 } })
      CustomEvent.emit(
        "userXpChange",
        { userId, xp: thisUserGame.xp },
        { userId, xp: 0 }
      )
      return 0
    }
    await Database.get("Game").updateOne(
      { _id: userId },
      { $inc: { xp: Math.round(xp) } }
    )
    CustomEvent.emit(
      "userXpChange",
      { userId, xp: thisUserGame.xp },
      { userId, xp: Math.round(xp + thisUserGame.xp) }
    )
    return Math.round(xp + thisUserGame.xp)
  }

  static async addGame(
    userId: string,
    heroId: HeroName | string,
    win: boolean = false
  ) {
    const thisUserGame = await Database.get("Game").findOrCreate("_id", userId)
    if (!thisUserGame.heroes[heroId]) return null
    await Database.get("Game").updateOne(
      { _id: userId },
      {
        $inc: {
          [`heroes.${heroId}.games`]: 1,
          [`heroes.${heroId}.wins`]: win ? 1 : 0,
        },
      }
    )
    // if (win) {
    //   if (Utils.isLimited(Packs.find("moon_pack")?.availableUntil)) {
    //     const random = Util.random(1, 100)
    //     if (random <= 2) {
    //       await this.updatePack(userId, "moon_pack", 1)
    //       new DiscordComponentBuilder()
    //         .createEmbed()
    //         .setText(
    //           `**${
    //             thisUserGame.nickname
    //           }** вам повезло, вы получаете ${Packs.find("moon_pack")}`
    //         )
    //         .sendToChannel(channel)
    //     }
    //   }
    // }
  }

  static async updateHero(
    userId: string,
    heroId: HeroName,
    data:
      | { type: "add"; skin?: string }
      | { type: "remove" }
      | HeroAttribute
      | { type: "set-skin"; skin: string }
  ) {
    const g = Database.get("Game")
    if ("type" in data) {
      if (data.type === "add") {
        const heroDefault = Heroes.find(heroId)
        const skin = Heroes.findSkin(heroDefault.id, data.skin)
        const _data: MongoHero = {
          skin: skin ? skin.id : heroDefault.id,
          attr: heroDefault.attr.eachTo(0),
          xp: 0,
          games: 0,
          wins: 0,
          skinsHave: skin ? [heroDefault.id, skin.id] : [heroDefault.id],
        }
        if (!heroDefault) return
        await g.updateOne(
          { _id: userId },
          { $set: { [`heroes.${heroId}`]: _data } }
        )
      } else if (data.type === "remove") {
        const thisUserGame = await g.findOrCreate("_id", userId)
        const _heroes = {}
        for (let k in thisUserGame.heroes) {
          if (k !== heroId) _heroes[k] = thisUserGame.heroes[k]
        }
        await g.updateOne({ _id: userId }, { $set: { heroes: _heroes } })
      } else if (data.type === "set-skin") {
        const thisUserGame = await g.findOrCreate("_id", userId)
        const heroDefault = Heroes.find(heroId)
        const skinData = Heroes.findSkin(heroId, data.skin)
        if (!skinData) return
        if (!thisUserGame.heroes[heroId]) return
        if (thisUserGame.heroes[heroId].skinsHave.includes(skinData.id)) {
          await g.updateOne(
            { _id: userId },
            { $set: { [`heroes.${heroId}.skin`]: skinData.id } }
          )
        } else {
          await g.updateOne(
            { _id: userId },
            {
              $set: { [`heroes.${heroId}.skin`]: skinData.id },
              $push: { [`heroes.${heroId}.skinsHave`]: skinData.id },
            }
          )
        }
      }
    } else {
      const thisUserGame = await g.findOrCreate("_id", userId)
      if (!thisUserGame.heroes[heroId]) return
      await g.updateOne(
        { _id: userId },
        { $set: { [`heroes.${heroId}.attr`]: data } }
      )
    }
  }
}

class Model<M extends keyof models, N extends models[M]> {
  readonly model: MongooseModel<any>
  constructor(private readonly modelName: M) {
    this.model = models[modelName]
  }

  async createOne(data: N): Promise<N> {
    const md = await this.model.create(data)
    await md.save()
    return ObjectFromKeys(md, keys[keyString(this.modelName)])
  }

  async findOrCreate<K extends keyof N, V extends N[K]>(
    key: K,
    value: V
  ): Promise<N> {
    const data = await this.model.findOne({ [key]: value })
    if (data) return ObjectFromKeys(data, keys[keyString(this.modelName)])
    const md =
      this.modelName === "Game"
        ? await this.model.create({
            [key]: value,
            ...(GameDatabaseOptions || {}),
          })
        : await this.model.create({ [key]: value })
    await md.save()
    return ObjectFromKeys(md, keys[keyString(this.modelName)])
  }

  async findOne<K extends keyof N, V extends N[K]>(
    key: K,
    value: V
  ): Promise<N> {
    const d = (await this.model.findOne({ [key]: value })) || null
    if (!d) return d
    return ObjectFromKeys(d, keys[keyString(this.modelName)])
  }

  async findOneFilter(filter?: FilterQuery<models[M]>): Promise<N> {
    const d = (await this.model.findOne(filter)) || null
    if (!d) return d
    return ObjectFromKeys(d, keys[keyString(this.modelName)])
  }

  async findMany(filter?: FilterQuery<models[M]>): Promise<N[]> {
    const d = (await this.model.find(filter)) || null
    if (!d) return d
    return d.map((doc) => ObjectFromKeys(doc, keys[keyString(this.modelName)]))
  }

  async updateOne(
    filter?: FilterQuery<models[M]>,
    update?: UpdateQuery<models[M]>
  ) {
    await this.model.updateOne(filter, update)
  }

  async updateMany(
    filter?: FilterQuery<models[M]>,
    update?: UpdateQuery<models[M]>
  ) {
    await this.model.updateMany(filter, update)
  }

  async deleteOne(
    filter?: FilterQuery<models[M]>,
    update?: UpdateQuery<models[M]>
  ) {
    await this.model.deleteOne(filter, update)
  }

  async deleteMany(
    filter?: FilterQuery<models[M]>,
    update?: UpdateQuery<models[M]>
  ) {
    await this.model.deleteMany(filter, update)
  }
}

function keyString(key: keyof models) {
  return `${key}Keys`
}

import { Chest } from "anytool"
import { Game } from "../../database/models/Game"
import { HeroList, HeroResolvable } from "../../heroes/typing/Other"
import { ObjectType } from "../typing/any"
import { RandomMoney } from "../typing/Money"

export const PacksChest = new Chest<PackName, Pack>()

export enum PackNames {
  startpack,
  small_chest,
  big_chest,
  love_pack,
  moon_pack,
}

export type PackName = keyof typeof PackNames

export interface PackRewards {
  "hero-pick": HeroList
  hero: HeroResolvable
  money: RandomMoney[]
  "skin-pick": { hero: HeroResolvable; skinId: string }[]
}

export class Pack<T extends keyof PackRewards = any> {
  id: PackName
  type: T
  availableUntil?: Date
  reward: () => PackRewards[T]

  constructor(data: Pack<T>) {
    Object.assign(this, data)
  }
}

export class Packs {
  static data = PacksChest

  static find<N extends PackName>(id: N): Pack<Pack["type"]>
  static find(name: string): Pack
  static find<N extends PackName>(id: N | string) {
    if (this.data.has(id as N)) return this.data.get(id as any)
    for (let _id in PackNames) {
      if (PackNames[_id].toLowerCase() === id.toLowerCase()) {
        return this.data.get(_id as any) || null
      } else continue
    }
    return null
  }

  static resolveUserPacks(
    packs: Game["packs"]
  ): Partial<ObjectType<keyof Game["packs"], [number, Pack]>> {
    const a = {}
    for (let i in packs) {
      const pack = this.find(i)
      if (!pack || !packs[i] || 0 > packs[i]) continue
      a[i] = [packs[i], pack]
    }
    return a
  }
}

import { Chest } from "anytool"
import { HeroList, HeroResolvable } from "../typing/Other"

export const HeroCollectionsChest = new Chest<
  HeroCollectionId,
  HeroCollection
>()

export enum HeroCollectionNames {
  startkit = "Начальные герои",
  lovekit = "Коллекция пар",
}

export type HeroCollectionId = keyof typeof HeroCollectionNames

export class HeroCollection {
  heroes: HeroList
  id: HeroCollectionId

  clone() {
    return new HeroCollection({ ...this })
  }

  constructor(data: Omit<HeroCollection, "toString" | "clone">) {
    Object.assign(this, data)
  }
}

export class HeroCollections {
  static data = HeroCollectionsChest

  static find<N extends HeroCollectionId>(id: N): HeroCollection
  static find(name: string): HeroCollection
  static find<N extends HeroCollectionId>(id: N | string) {
    if (this.data.has(id as any)) return this.data.get(id as any)?.clone()
    for (let _id in HeroCollectionNames) {
      if (HeroCollectionNames[_id].toLowerCase() === id.toLowerCase()) {
        return this.data.get(_id as any)?.clone() || null
      } else continue
    }
    return null
  }

  static heroCollections(_hero: HeroResolvable) {
    return (
      this.data.filter((cl) => cl.heroes.has(_hero))?.map((c) => c.clone()) ||
      null
    )
  }
}

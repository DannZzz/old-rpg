import HeroName from "../../configuration/HeroNaming"
import { ObjectType } from "../../game/typing/any"
import { Price } from "../../game/typing/Money"
import Utils from "../../utils/main"
import Heroes from "../Heroes"
import Hero from "./Hero"
import HeroChest from "./HeroChest"

export enum HeroAttributesEnum {
  hp,
  dmg,
  dxt,
}

export class HeroAttribute {
  dmg: number
  dxt: number
  hp: number
  constructor(
    data: ObjectType<keyof typeof HeroAttributesEnum, number>,
    ...aditional: ObjectType<keyof typeof HeroAttributesEnum, number, true>[]
  ) {
    Object.assign(this, data)
    this.add(...aditional)
  }

  addPercentToEach(percent: number) {
    for (let i in HeroAttributesEnum) {
      this[i] = this[i]
        ? this[i] + Math.ceil(Utils.percentOf(this[i], percent))
        : 0 + Math.ceil(Utils.percentOf(this[i], percent))
    }
    return this
  }

  setLevel(level: number) {
    for (let k in HeroAttributesEnum) {
      if (this[k]) this[k] += (this[k] / 10) * (level - 1)
    }
    return this
  }

  eachTo(number: number) {
    for (let i in HeroAttributesEnum) {
      this[i] = number
    }
    return this
  }

  add(
    ...aditional: ObjectType<keyof typeof HeroAttributesEnum, number, true>[]
  ) {
    if (aditional) {
      aditional.forEach((d) => {
        if (!d) return
        for (let i in d) {
          if (this[i]) {
            this[i] += d[i] || 0
          } else {
            this[i] = d[i] || 0
          }
        }
      })
    }
    return this
  }

  toString() {
    const m = Utils.formatNumber
    return Object.entries(HeroAttributesEnum)
      .map(([k, emoji]) => `${emoji} ${m(this[k] as any)}`)
      .join("\n")
  }
}

export enum HeroSkinRarityNames {
  common = "Standart",
  elite = "Elite",
  special = "Special",
  epic = "Epic",
  legendary = "Legendary",
  egyptian = "𐌄Ᏽ𐌙𐌐𐌕𐌉𐌀𐌍",
  moon = "ᘻᓍᓍᘉ",
}

export type HeroSkinRarity = keyof typeof HeroSkinRarityNames

export enum HeroElementsNames {
  fire = "🔥",
  water = "💧",
  blood = "🩸",
  snow = "❄",
  wind = "🌪",
  magic = "🔮",
  rainbow = "🌈",
  light = "🔱",
  darkness = "⚜",
}

export const HeroElementsContrs: ObjectType<
  keyof typeof HeroElementsNames,
  (keyof typeof HeroElementsNames)[]
> = {
  fire: ["blood"],
  water: ["fire"],
  blood: ["magic"],
  snow: ["water"],
  wind: ["snow"],
  magic: ["light"],
  rainbow: ["wind"],
  darkness: ["rainbow"],
  light: ["darkness"],
}

export type HeroElementKey = keyof typeof HeroElementsNames

export class HeroElement {
  readonly elements: HeroElementKey[]
  constructor(...elements: HeroElementKey[]) {
    this.elements = elements
  }

  toString() {
    return this.elements.map((k) => HeroElementsNames[k]).join(" ")
  }
}

export type SkinBonus = ObjectType<
  keyof typeof HeroAttributesEnum,
  number,
  true
>

export interface Fighter {
  noSkinBonus?: boolean
  id: HeroName
  attr: HeroAttribute
  anyId: string
  skin: string
}

export class HeroList {
  heroes: Hero[]

  has(hero: HeroResolvable): boolean {
    const heroes = Utils.resolveHero(hero)
    return heroes.every((h) => this.heroes.find((hs) => hs.id === h.id))
  }

  constructor(...heroes: HeroResolvable[]) {
    let hs = []
    heroes.forEach((h) => {
      if (typeof h === "string") {
        hs.push(Heroes.find(h))
      } else if (h instanceof HeroList) {
        h.heroes.forEach((h) => hs.push(h))
      } else {
        hs.push(h)
      }
    })
    this.heroes = hs
  }
}

export class HeroSkin {
  name: string
  bonus: SkinBonus
  rarity: HeroSkinRarity
  price: Price
  id: string
  availableUntil?: Date

  constructor(obj: HeroSkin) {
    Object.assign(this, obj)
  }
}

export type HeroResolvable = HeroName | HeroList | Hero

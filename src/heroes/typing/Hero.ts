import { WebName } from "../../config"
import HeroName from "../../configuration/HeroNaming"
import { Price } from "../../game/typing/Money"
import Heroes from "../Heroes"
import { HeroAttribute, HeroElement, HeroSkin } from "./Other"

class Hero {
  id: HeroName
  description: string
  attr: HeroAttribute
  skins: HeroSkin[]
  isVip: boolean
  emoji: string
  isAvailableInShop: boolean
  isEventHero: boolean
  price: Price
  elements: HeroElement

  avatarURL(skin?: string) {
    return `${WebName}/api/v1/public/hero/avatar/${this.id}/${
      skin || this.id
    }.jpg`
  }

  clone() {
    return new Hero({ ...this, attr: Heroes.attrFrom(this.attr) })
  }

  constructor(data: Omit<Hero, "avatarURL" | "clone">) {
    Object.assign(this, data)
  }
}

export default Hero

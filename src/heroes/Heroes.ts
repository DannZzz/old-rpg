import { Chest, randomNumber } from "anytool"
import { DxtDoubleAttackChance } from "../configuration/any-config"
import HeroName, { HeroNames } from "../configuration/HeroNaming"
import { Levels } from "../game/data/Levels"
import Money from "../game/typing/Money"
import Utils from "../utils/main"
import { HeroCollections } from "./collections/Collection"
import Hero from "./typing/Hero"
import HeroChest from "./typing/HeroChest"
import {
  HeroAttribute,
  HeroResolvable,
  HeroList,
  HeroSkinRarityNames,
  HeroSkin,
  Fighter,
  HeroElement,
  HeroElementsNames,
  HeroElementsContrs,
} from "./typing/Other"

class Heroes {
  static list = HeroChest

  static attr(id: HeroName | string, data: any) {
    const _data = { ...data.attr }
    const heroLevel = Levels.levelFor(data.xp)
    const hero = this.find(id)
    for (let k in _data) {
      if (hero.attr[k]) _data[k] += (hero.attr[k] / 10) * (heroLevel - 1)
    }
    const skinData = this.findSkin(id as any, data.skin)
    return new HeroAttribute(_data, skinData?.bonus, hero.attr)
  }
  static attrFrom(attr: HeroAttribute) {
    return new HeroAttribute(attr)
  }

  static clone(hero: HeroResolvable) {
    const h = Utils.resolveHero(hero)[0]
    return new Hero({ ...h })
  }

  static filter(fn: (hero: Hero) => boolean) {
    return new HeroList(...this.list.filter(fn).values())
  }

  static get collections() {
    return HeroCollections
  }

  static filterSkin(rarity: keyof typeof HeroSkinRarityNames) {
    return this.filter((h) => Boolean(h.skins.find((s) => s.rarity === rarity)))
  }

  static find<N extends HeroName>(id: N): Hero
  static find(name: string): Hero
  static find<N extends HeroName>(id: N | string) {
    if (this.list.has(id as any)) return this.list.get(id as any)?.clone()
    for (let _id in HeroNames) {
      if (HeroNames[_id].toLowerCase() === id.toLowerCase()) {
        return this.list.get(_id as any)?.clone() || null
      }
    }
    return null
  }

  static findSkin(heroId: HeroName | string, skin: string): HeroSkin {
    const hero = this.find(heroId)
    if (!skin || !hero) return null
    if (heroId.toLowerCase() === skin.toLowerCase())
      return {
        bonus: {},
        price: new Money("invalid"),
        id: hero.id,
        rarity: "common",
        name: `${hero}`,
      }
    return (
      hero.skins.find((s) => s.id.toLowerCase() === skin.toLowerCase()) || null
    )
  }

  static sort(): typeof Heroes["list"] {
    let chest = new Chest()
    for (let i in HeroNames) {
      const hd = Heroes.find(i)
      hd && chest.set(i, hd)
    }
    return chest as any
  }

  static fight(f1: Fighter, f2: Fighter) {
    let h1 = this.find(f1.id)
    let h2 = this.find(f2.id)

    if (!f1.noSkinBonus) f1.attr.add(this.findSkin(f1.id, f1.skin)?.bonus)
    if (!f2.noSkinBonus) f2.attr.add(this.findSkin(f2.id, f2.skin)?.bonus)
    const els = this.elementBuffLevel(h1.elements, h2.elements)
    f1.attr.dmg *= els.p1
    f2.attr.dmg *= els.p2
    if (f1.attr?.dxt >= f2.attr?.dxt) {
      while (true) {
        f2.attr.hp -=
          f1.attr.dmg * (randomNumber(1, 100) <= DxtDoubleAttackChance ? 2 : 1)
        if (f2.attr.hp <= 0) break
        f1.attr.hp -= f2.attr.dmg
        if (f1.attr.hp <= 0) break
      }
    } else {
      while (true) {
        f1.attr.hp -=
          f2.attr.dmg * (randomNumber(1, 100) <= DxtDoubleAttackChance ? 2 : 1)
        if (f1.attr.hp <= 0) break
        f2.attr.hp -= f1.attr.dmg
        if (f2.attr.hp <= 0) break
      }
    }

    if (f1.attr.hp <= 0) {
      f1.attr.hp = 0
      return {
        winner: f2,
        loser: f1,
      }
    }
    if (f2.attr.hp <= 0) {
      f2.attr.hp = 0
      return {
        winner: f1,
        loser: f2,
      }
    }
  }

  static elementBuffLevel(p1: HeroElement, p2: HeroElement) {
    let f = 0
    function check(el: keyof typeof HeroElementsNames, els: HeroElement) {
      if (HeroElementsContrs[el].some((contr) => els.elements.includes(contr)))
        return 1
      if (els.elements.includes(el)) return -1
      return 0
    }

    p1.elements.forEach((el) => {
      f += check(el, p2)
    })

    p2.elements.forEach((el) => {
      f -= check(el, p1)
    })

    if (f === 0) {
      return {
        p1: 1,
        p2: 1,
      }
    } else if (f > 0) {
      return {
        p1: 2,
        p2: 1,
      }
    } else if (f < 0) {
      return {
        p1: 1,
        p2: 2,
      }
    }
  }
}

export default Heroes

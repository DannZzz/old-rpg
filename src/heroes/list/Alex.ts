import { RaritySkinCost } from "../../configuration/any-config"
import { LimitedSkinsBuff, SkinLimits } from "../../configuration/Limits"
import { Cost } from "../../game/typing/Money"
import Hero from "../typing/Hero"
import { HeroAttribute, HeroElement } from "../typing/Other"

export default new Hero({
  id: "Alex",
  attr: new HeroAttribute({ hp: 5250, dmg: 95, dxt: 13 }),
  description:
    "Самый обычный работяга устал от жизни, почему бы ему не отвлечься и не изучать тёмные стороны Земли?",
  isAvailableInShop: true,
  isVip: false,
  emoji: "<:Alex:1008050497808248894>",
  isEventHero: false,
  price: new Cost("secondary", 9000, new Cost("secondary", 7999)),
  elements: new HeroElement("wind"),
  skins: [
    {
      id: "night-biker",
      name: "Ночной Байкер",
      bonus: { dmg: 60 },
      price: new Cost("primary", RaritySkinCost.elite),
      rarity: "elite",
    },
    {
      id: "koshmar",
      name: "Кошмар",
      bonus: { dmg: 50, hp: 400 },
      price: new Cost("primary", RaritySkinCost.special),
      rarity: "special",
    },
    {
      id: "mufar",
      name: "Муфар",
      bonus: LimitedSkinsBuff.moon,
      rarity: "moon",
      price: new Cost("primary", RaritySkinCost.moon),
      availableUntil: SkinLimits.moon,
    },
  ],
})

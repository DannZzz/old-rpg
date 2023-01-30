import { Cost } from "../../game/typing/Money"
import Hero from "../typing/Hero"
import { HeroAttribute, HeroElement } from "../typing/Other"

export default new Hero({
  id: "San",
  attr: new HeroAttribute({ hp: 7200, dmg: 55, dxt: 14 }),
  description: "- Ты что, увидел радугу?\n\n- Нет, я увидел Сан!",
  isAvailableInShop: true,
  isVip: false,
  emoji: "<:San:1010512549298573332>",
  isEventHero: false,
  price: new Cost("secondary", 11000, new Cost("secondary", 8999)),
  elements: new HeroElement("rainbow", "snow"),
  skins: [],
})

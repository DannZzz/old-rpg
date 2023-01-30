import { RaritySkinCost } from "../../configuration/any-config"
import { Cost } from "../../game/typing/Money"
import Hero from "../typing/Hero"
import { HeroAttribute, HeroElement } from "../typing/Other"

export default new Hero({
  id: "Ming",
  attr: new HeroAttribute({ hp: 4100, dmg: 85, dxt: 15 }),
  description:
    "Что получится если с 3-х лет взять в руки катану и изучать боевые исскуства?\nМинь вам ответит.",
  isAvailableInShop: true,
  isVip: false,
  emoji: "<:Ming:1005129946135527464>",
  isEventHero: false,
  price: new Cost("secondary", 5000),
  skins: [
    {
      id: "son-of-grom",
      name: "Сын Грома",
      bonus: { dxt: 10, hp: 800 },
      price: new Cost("primary", RaritySkinCost.special),
      rarity: "special",
    },
    {
      id: "mythical-samurai",
      name: "Мистический Самурай",
      bonus: { dmg: 75, hp: 500 },
      price: new Cost("primary", RaritySkinCost.epic),
      rarity: "epic",
    },
  ],
  elements: new HeroElement("blood"),
})

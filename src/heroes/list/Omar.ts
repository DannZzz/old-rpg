import { RaritySkinCost } from "../../configuration/any-config"
import { Cost } from "../../game/typing/Money"
import Hero from "../typing/Hero"
import { HeroAttribute, HeroElement } from "../typing/Other"

export default new Hero({
  id: "Omar",
  attr: new HeroAttribute({ hp: 7600, dmg: 66, dxt: 8 }),
  description: "Жестокий Царь орков готов забрать весь мир!",
  isAvailableInShop: true,
  isVip: false,
  emoji: "<:Omar:1009212661638123631>",
  isEventHero: false,
  price: new Cost("secondary", 9000),
  elements: new HeroElement("magic", "fire"),
  skins: [
    {
      id: "japan-samurai",
      name: "Японский Самурай",
      bonus: { hp: 550, dxt: 5 },
      price: new Cost("primary", RaritySkinCost.elite),
      rarity: "elite",
    },
    {
      id: "captain-okotachi",
      name: "Капитан Окотачи",
      bonus: { dmg: 40, hp: 500 },
      price: new Cost("primary", RaritySkinCost.epic),
      rarity: "epic",
    },
  ],
})

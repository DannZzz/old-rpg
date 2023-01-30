import { RaritySkinCost } from "../../configuration/any-config"
import { Cost } from "../../game/typing/Money"
import Hero from "../typing/Hero"
import { HeroAttribute, HeroElement } from "../typing/Other"

export default new Hero({
  id: "Ninos",
  attr: new HeroAttribute({ hp: 11300, dmg: 110, dxt: 21 }),
  description:
    "Испанский Ангел Эль Ниньё научился создавать своих клонов, их стало больше сотни. И люди начали его называть Нинос.",
  isAvailableInShop: true,
  isVip: false,
  emoji: "<:Ninos:1010512585596076112>",
  isEventHero: false,
  price: new Cost("secondary", 21000, new Cost("secondary", 18999)),
  elements: new HeroElement("light", "fire"),
  skins: [
    {
      id: "luch-sveta",
      name: "Луч Света",
      bonus: { hp: 700, dmg: 30 },
      rarity: "special",
      price: new Cost("primary", RaritySkinCost.special),
    },
  ],
})

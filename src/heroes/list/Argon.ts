import { RaritySkinCost } from "../../configuration/any-config";
import { Cost } from "../../game/typing/Money";
import Hero from "../typing/Hero";
import { HeroAttribute, HeroElement } from "../typing/Other";


export default new Hero({
  id: "Argon",
  attr: new HeroAttribute({ hp: 19800, dmg: 188, dxt: 41 }),
  description: "Да здравствует Мрак!\n\nСледующая цель Аргона - Земля!",
  isAvailableInShop: true,
  isVip: false,
  emoji: "<:Argon:1010512645679501373>",
  isEventHero: false,
  price: new Cost("secondary", 66000, new Cost("secondary", 62999)),
  elements: new HeroElement("darkness", "water", "blood"),
  skins: [
    {
      id: "supernatural",
      name: "Сверхъестественный",
      bonus: { hp: 870, dmg: 85 },
      rarity: "epic",
      price: new Cost("primary", RaritySkinCost.epic),
    },
  ],
})

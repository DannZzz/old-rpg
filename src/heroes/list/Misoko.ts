import { RaritySkinCost } from "../../configuration/any-config";
import { Cost } from "../../game/typing/Money";
import Hero from "../typing/Hero";
import { HeroAttribute, HeroElement } from "../typing/Other";

export default new Hero({
  id: "Misoko",
  attr: new HeroAttribute({ hp: 9250, dmg: 77, dxt: 9 }),
  description: "Аниме - Начало",
  isAvailableInShop: true,
  isVip: false,
  emoji: "<:Misoko:1008315012923805706>",
  isEventHero: false,
  price: new Cost("secondary", 12000, new Cost("secondary", 9999)),
  elements: new HeroElement("water", "snow"),
  skins: [
    {
      id: "heart-of-sea",
      name: "Сердце Моря",
      bonus: { hp: 950, dmg: 20 },
      price: new Cost("primary", RaritySkinCost.epic),
      rarity: "epic",
    },
  ],
})

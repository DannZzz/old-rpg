import { RaritySkinCost } from "../../configuration/any-config";
import { Cost } from "../../game/typing/Money";
import Hero from "../typing/Hero";
import { HeroAttribute, HeroElement } from "../typing/Other";

export default new Hero({
  id: "Malxaz",
  attr: new HeroAttribute({ hp: 8500, dmg: 95, dxt: 1 }),
  description:
    "Кто-то говорит, что Малхаз на самом деле человек, а другой, монстр.\n\nНеважно кто он, но он стрёмный.",
  isAvailableInShop: true,
  isVip: false,
  emoji: "<:Malxaz:1006893417151868968>",
  isEventHero: false,
  price: new Cost("secondary", 10000),
  skins: [
    {
      id: "plamen-izobretatel",
      name: "Пламенный Изобретатель",
      bonus: { dxt: 20, hp: 300 },
      price: new Cost("primary", RaritySkinCost.elite),
      rarity: "elite",
    },
  ],
  elements: new HeroElement("snow", "fire"),
})

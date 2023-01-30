import { RaritySkinCost } from "../../configuration/any-config";
import { LimitedSkinsBuff, SkinLimits } from "../../configuration/Limits";
import { Cost } from "../../game/typing/Money";
import Hero from "../typing/Hero";
import { HeroAttribute, HeroElement } from "../typing/Other";

export default new Hero({
  id: "Diana",
  attr: new HeroAttribute({ hp: 14100, dmg: 165, dxt: 33 }),
  description:
    "Слышали о Посейдоне?\n\nА у него были дети?\n\nПотерянная дочь Посейдона - Диана.",
  isAvailableInShop: true,
  isVip: false,
  emoji: "<:Diana:1008317367597670432>",
  isEventHero: false,
  price: new Cost("primary", 899),
  elements: new HeroElement("water", "wind"),
  skins: [
    {
      id: "poluvoda",
      name: "Полувода",
      bonus: { hp: 1700 },
      price: new Cost("primary", RaritySkinCost.special),
      rarity: "special",
    },
    {
      id: "koroleva-vodi",
      name: "Королева Воды",
      bonus: { dmg: 95, hp: 1200 },
      price: new Cost("primary", RaritySkinCost.legendary),
      rarity: "legendary",
    },
    {
      id: "cleopatra",
      name: "Клеопатра",
      bonus: LimitedSkinsBuff.egyptian,
      price: new Cost("primary", RaritySkinCost.egyptian),
      rarity: "egyptian",
      availableUntil: SkinLimits.egyptian,
    },
  ],
})

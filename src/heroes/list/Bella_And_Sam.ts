import { RaritySkinCost } from "../../configuration/any-config";
import { Cost } from "../../game/typing/Money";
import Hero from "../typing/Hero";
import { HeroAttribute, HeroElement } from "../typing/Other";

export default new Hero({
  id: "Bella_And_Sam",
  attr: new HeroAttribute({ hp: 7000, dmg: 45, dxt: 8 }),
  description:
    "Девочка по имени Белла потерялась во мраке за горой Анталан. С первого взгляда опасный тигр нашёл её и не трогал, они даже и подружились. Теперь они вместе до этого дня.",
  isAvailableInShop: true,
  isVip: false,
  emoji: "<:Bella_And_Sam:1005201252155654235>",
  isEventHero: false,
  price: new Cost("secondary", 6500),
  skins: [
    {
      id: "charodejka",
      name: "Чародейка",
      bonus: { hp: 400, dxt: 5 },
      price: new Cost("primary", RaritySkinCost.elite),
      rarity: "elite",
    },
    {
      id: "timely-mechta",
      name: "Временная Мечта",
      bonus: { hp: 950, dmg: 45 },
      price: new Cost("primary", RaritySkinCost.special),
      rarity: "special",
    },
  ],
  elements: new HeroElement("water"),
})

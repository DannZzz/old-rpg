import { RaritySkinCost } from "../../configuration/any-config";
import { Cost } from "../../game/typing/Money";
import Hero from "../typing/Hero";
import { HeroAttribute, HeroElement } from "../typing/Other";

export default new Hero({
  id: "Rocky",
  attr: new HeroAttribute({ hp: 17500, dmg: 10, dxt: 3 }),
  description:
    "Где-то на севере обрушились камни, и вдруг оживили..\nЭто был Рокки..\nНо ему не понравилось белый снег, и он решил начать новое путешествие!",
  isAvailableInShop: true,
  isVip: false,
  emoji: "<:Rocky:1007729003878166558>",
  isEventHero: false,
  price: new Cost("secondary", 15000),
  skins: [
    {
      id: "dixanie-zimi",
      name: "Дыхание Зимы",
      bonus: { hp: 200, dxt: 5, dmg: 20 },
      price: new Cost("primary", RaritySkinCost.elite),
      rarity: "elite",
    },
    {
      id: "totalizator",
      name: "Тотализатор",
      bonus: { dxt: 20, dmg: 50 },
      price: new Cost("primary", RaritySkinCost.special),
      rarity: "special",
    },
    {
      id: "izumrud-kamen",
      name: "Изумрудный Камень",
      bonus: { dmg: 65, hp: 550 },
      rarity: "epic",
      price: new Cost("primary", RaritySkinCost.epic),
    },
  ],
  elements: new HeroElement("snow"),
})

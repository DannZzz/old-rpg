import { RaritySkinCost } from "../../configuration/any-config"
import { LimitedSkinsBuff, SkinLimits } from "../../configuration/Limits"
import { Cost } from "../../game/typing/Money"
import Hero from "../typing/Hero"
import { HeroAttribute, HeroElement } from "../typing/Other"

export default new Hero({
  id: "Manor",
  attr: new HeroAttribute({ hp: 13500, dmg: 130, dxt: 27 }),
  description:
    "Добро Пожаловать!\n\nПутешествие во времени открыто благодаря Манор.",
  isAvailableInShop: true,
  isVip: false,
  emoji: "<:Manor:1009524699606302720>",
  isEventHero: false,
  price: new Cost("primary", 799),
  elements: new HeroElement("magic", "fire"),
  skins: [
    {
      id: "sila-vremeni",
      name: "Сила Времени",
      bonus: { hp: 500, dxt: 5 },
      price: new Cost("primary", RaritySkinCost.elite),
      rarity: "elite",
    },
    {
      id: "guest-proshlogo",
      name: "Гость из Прошлого",
      bonus: { hp: 850, dmg: 30 },
      price: new Cost("primary", RaritySkinCost.special),
      rarity: "special",
    },
    {
      id: "bezjalostnaya-magia",
      name: "Безжалостная Магия",
      bonus: { dmg: 70, hp: 600 },
      price: new Cost("primary", RaritySkinCost.epic),
      rarity: "epic",
    },
    {
      id: "blood-of-demon",
      name: "Кровь Демона",
      bonus: { dmg: 90, dxt: 20, hp: 1000 },
      rarity: "legendary",
      price: new Cost("primary", RaritySkinCost.legendary),
    },
    {
      id: "anubis",
      name: "Анубис",
      bonus: LimitedSkinsBuff.egyptian,
      price: new Cost("primary", RaritySkinCost.egyptian),
      rarity: "egyptian",
      availableUntil: SkinLimits.egyptian,
    },
    {
      id: "moon-strannik",
      name: "Странник Луны",
      bonus: LimitedSkinsBuff.moon,
      price: new Cost("primary", RaritySkinCost.moon),
      rarity: "moon",
      availableUntil: SkinLimits.moon,
    },
  ],
})

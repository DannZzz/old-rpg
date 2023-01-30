import { RaritySkinCost } from "../../configuration/any-config"
import { LimitedSkinsBuff, SkinLimits } from "../../configuration/Limits"
import { Cost } from "../../game/typing/Money"
import Hero from "../typing/Hero"
import { HeroAttribute, HeroElement } from "../typing/Other"

export default new Hero({
  id: "Amanta",
  attr: new HeroAttribute({ hp: 7250, dmg: 105, dxt: 10 }),
  description:
    "Аманта, маг из средневековье. Мало что о ней известно, говорят, она лечила раненные душы.",
  isAvailableInShop: true,
  isVip: false,
  emoji: "<:Amanta:1007365718498627664>",
  isEventHero: false,
  price: new Cost("secondary", 15000),
  skins: [
    {
      id: "izbranica-mraka",
      name: "Избранница Мрака",
      bonus: { hp: 250, dxt: 8, dmg: 20 },
      price: new Cost("primary", RaritySkinCost.elite),
      rarity: "elite",
    },
    {
      id: "otshelnica",
      name: "Отшельница",
      bonus: { dxt: 15, dmg: 70 },
      price: new Cost("primary", RaritySkinCost.special),
      rarity: "special",
    },
    {
      id: "chudo-sveta",
      name: "Чудо Света",
      bonus: { dmg: 55, hp: 500 },
      rarity: "epic",
      price: new Cost("primary", RaritySkinCost.epic),
    },
    {
      id: "golaya-magia",
      name: "Голая Магия",
      bonus: { dmg: 100, dxt: 20, hp: 850 },
      rarity: "legendary",
      price: new Cost("primary", RaritySkinCost.legendary),
    },
    {
      id: "witch-from-moon",
      name: "Маг с Луны",
      bonus: LimitedSkinsBuff.moon,
      rarity: "moon",
      price: new Cost("primary", RaritySkinCost.moon),
      availableUntil: SkinLimits.moon,
    },
  ],
  elements: new HeroElement("magic", "blood"),
})

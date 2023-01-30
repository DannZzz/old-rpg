import { RaritySkinCost } from "../../configuration/any-config"
import { LimitedSkinsBuff, SkinLimits } from "../../configuration/Limits"
import { Cost } from "../../game/typing/Money"
import Hero from "../typing/Hero"
import { HeroAttribute, HeroElement } from "../typing/Other"

export default new Hero({
  id: "Kaja",
  attr: new HeroAttribute({ hp: 4500, dmg: 75, dxt: 15 }),
  description:
    "Кайя ещё был маленьким ребёнком пока его не украл Грифон. Время с Грифоном изменил Кайю, и вот какой он сейчас.",
  isAvailableInShop: true,
  isVip: false,
  emoji: "<:Kaja:1005139152167256084>",
  isEventHero: false,
  price: new Cost("secondary", 5000),
  skins: [
    {
      id: "fire-dragon",
      name: "Огненный Грифон",
      bonus: { hp: 560 },
      price: new Cost("primary", RaritySkinCost.elite),
      rarity: "elite",
    },
    {
      id: "horus",
      name: "Хорус",
      bonus: LimitedSkinsBuff.egyptian,
      price: new Cost("primary", RaritySkinCost.egyptian),
      rarity: "egyptian",
      availableUntil: SkinLimits.egyptian,
    },
  ],
  elements: new HeroElement("fire", "water"),
})

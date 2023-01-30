import { RaritySkinCost } from "../../configuration/any-config"
import { LimitedSkinsBuff, SkinLimits } from "../../configuration/Limits"
import { Cost } from "../../game/typing/Money"
import Hero from "../typing/Hero"
import { HeroAttribute, HeroElement } from "../typing/Other"

export default new Hero({
  id: "Elena",
  attr: new HeroAttribute({ hp: 8700, dmg: 140, dxt: 15 }),
  description:
    "Говорят на севере обитает девушка, которая общается с зимой, холодом, морозом и снегом.\n\nКто же это?",
  isAvailableInShop: true,
  isVip: false,
  emoji: "<:Elena:1010907819383463966>",
  isEventHero: false,
  price: new Cost("secondary", 17800),
  elements: new HeroElement("snow", "rainbow"),
  skins: [
    {
      id: "mars-adventure",
      name: "Марсианское Путешествие",
      bonus: { dmg: 80, hp: 600, dxt: 10 },
      rarity: "epic",
      price: new Cost("primary", RaritySkinCost.epic),
    },
    {
      id: "queen-of-angels",
      name: "Королева Ангелов",
      bonus: { dmg: 100, hp: 750, dxt: 10 },
      price: new Cost("primary", RaritySkinCost.legendary),
      rarity: "legendary",
    },
    {
      id: "moon-vspishka",
      name: "Лунная Вспышка",
      bonus: LimitedSkinsBuff.moon,
      rarity: "moon",
      price: new Cost("primary", RaritySkinCost.moon),
      availableUntil: SkinLimits.moon,
    },
  ],
})

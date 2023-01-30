import { RaritySkinCost } from "../../configuration/any-config"
import { LimitedSkinsBuff } from "../../configuration/Limits"
import { Cost } from "../../game/typing/Money"
import Hero from "../typing/Hero"
import { HeroAttribute, HeroElement } from "../typing/Other"

export default new Hero({
  id: "Atilla",
  attr: new HeroAttribute({ hp: 7250, dmg: 135, dxt: 10 }),
  description:
    "Атилла - царь гуннов, жестокий монарх.\n- А как он стал царём?\n- Атилла убил своего брата..",
  isAvailableInShop: true,
  isVip: false,
  emoji: "<:Atilla:1006222992071741600>",
  isEventHero: false,
  price: new Cost("secondary", 15000),
  skins: [
    {
      id: "mrac-ricar",
      name: "Мрачный Рыцарь",
      bonus: { hp: 400, dxt: 2, dmg: 20 },
      price: new Cost("primary", RaritySkinCost.elite),
      rarity: "elite",
    },
    {
      id: "chingis-xan",
      name: "Чингис Хан",
      bonus: { hp: 800 },
      price: new Cost("primary", RaritySkinCost.special),
      rarity: "special",
    },
    {
      id: "tevton-orden",
      name: "Тевтонский Орден",
      bonus: { dmg: 45, hp: 600 },
      rarity: "epic",
      price: new Cost("primary", RaritySkinCost.epic),
    },
    {
      id: "temniy-paladin",
      name: "Тёмный Паладин",
      bonus: { dmg: 130, hp: 1000 },
      rarity: "legendary",
      price: new Cost("primary", RaritySkinCost.legendary),
    },
    {
      id: "moon-lord",
      name: "Лунный Лорд",
      bonus: LimitedSkinsBuff.moon,
      rarity: "moon",
      price: new Cost(),
    },
  ],
  elements: new HeroElement("wind", "magic"),
})

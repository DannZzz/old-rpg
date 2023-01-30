import { randomNumber } from "anytool"
import { processOr } from "../config"
import { ObjectType } from "../game/typing/any"
import Money, { Price } from "../game/typing/Money"
import {
  HeroSkinRarityNames,
  HeroAttribute,
  HeroAttributesEnum,
} from "../heroes/typing/Other"

export const RaritySkinCost: ObjectType<
  keyof Omit<typeof HeroSkinRarityNames, "common">,
  number,
  true
> = {
  elite: 150,
  special: 799,
  epic: 1099,
  legendary: 1599,
  egyptian: 599,
  moon: 1289,
}

export const DxtDoubleAttackChance: number = +processOr(
  "DxtDoubleAttackChance",
  "20"
)

export const MaxLevel: number = 100

export const OnNewLevelAddingAttr: HeroAttribute = new HeroAttribute({
  dmg: 10,
  hp: 250,
  dxt: 2,
})

export const BonusBuying: ObjectType<
  keyof typeof HeroAttributesEnum,
  { amount: number; price: Price }
> = {
  dmg: {
    amount: 3,
    price: new Money(5, "primary"),
  },
  hp: {
    amount: 120,
    price: new Money(5, "primary"),
  },
  dxt: {
    amount: 2,
    price: new Money(5, "primary"),
  },
}

export const MaxNicknameLength: number = 40

export const HeroCostIfExists: number = 15

// export const UserDatabaseOptions: Partial<User> = {
//   packs: { startpack: 1, big_chest: 1 },
// }

export const UserXpAfterWin = () => randomNumber(25, 75)

export const HeroXpAfterWin = () => randomNumber(12, 45)

export const DuelMoney = () => randomNumber(55, 355)

export const RateMoney = () => randomNumber(40, 255)

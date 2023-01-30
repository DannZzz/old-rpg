import { randomNumber } from "anytool"
import { RandomMoney } from "../../typing/Money"
import { Pack } from "../Packs"

export default new Pack({
  type: "money",
  reward: () => [new RandomMoney("secondary", () => randomNumber(50, 350))],
  id: "small_chest",
})

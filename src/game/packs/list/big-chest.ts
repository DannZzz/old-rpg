import { randomNumber } from "anytool";
import { RandomMoney } from "../../typing/Money";
import { Pack } from "../Packs";

export default new Pack({
    type: "money",
    reward: () => [new RandomMoney("secondary", () => randomNumber(250, 1050)), new RandomMoney("primary", () => randomNumber(10, 25))],
    id: "big_chest",
})
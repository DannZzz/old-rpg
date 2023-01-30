import { Chest } from "anytool"
import HeroName from "../../configuration/HeroNaming"
import Hero from "./Hero"

const HeroChest = new Chest<HeroName, Hero>()

export default HeroChest

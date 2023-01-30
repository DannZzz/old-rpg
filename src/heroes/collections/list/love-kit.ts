import { HeroList } from "../../typing/Other";
import { HeroCollection } from "../Collection";

export default new HeroCollection({
  heroes: new HeroList("Manor", "Diana"),
  id: "lovekit",
})

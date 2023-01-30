import { HeroList } from "../../typing/Other"
import { HeroCollection } from "../Collection"

export default new HeroCollection({
  heroes: new HeroList("Kaja", "Ming", "Afina", "Lucius"),
  id: "startkit",
})

import Heroes from "../../../heroes/Heroes"
import { Pack } from "../Packs"

export default new Pack({
  id: "startpack",
  type: "hero-pick",
  reward: () => Heroes.collections.find("startkit")?.heroes,
})

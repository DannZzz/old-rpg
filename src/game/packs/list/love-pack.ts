import Heroes from "../../../heroes/Heroes"
import { Pack } from "../Packs"

export default new Pack({
  id: "love_pack",
  type: "hero-pick",
  reward: () => Heroes.collections.find("lovekit")?.heroes,
})

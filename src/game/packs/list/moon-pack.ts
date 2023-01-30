import { SkinLimits } from "../../../configuration/Limits"
import Heroes from "../../../heroes/Heroes"
import { Pack } from "../Packs"

export default new Pack({
  id: "moon_pack",
  type: "skin-pick",
  availableUntil: SkinLimits.moon,
  reward: () =>
    Heroes.filterSkin("moon")
      .heroes.filter((h) =>
        Boolean(h.skins.find((s) => s.rarity === "moon")?.price?.type)
      )
      .map((hd) => {
        return {
          hero: hd,
          skinId: hd.skins.find((s) => s.rarity === "moon").id,
        }
      }),
})

import React from "react"
import { useTranslation } from "react-i18next"
import "./Home.scss"
import PageSound from "../../features/sound/PageSound"
import { useAppSelector } from "../../app/hooks"
import { selectSound } from "../../features/sound/sound"
import Animation from "../../components/Animation/Animation"
import classNames from "classnames"
import { selectSettings } from "../../features/settings/settings"

const Home = () => {
  const { globalMusic } = useAppSelector(selectSound)
  const { graphic } = useAppSelector(selectSettings)
  const { t, i18n } = useTranslation()
  return (
    <div className="home">
      <Animation type="snowfall" />
      {!!globalMusic && <PageSound music="home" />}
      <div className="home-content">
        <h1 className="title">{t("home.title-1")}</h1>
      </div>
      <img
        className={classNames("tree", { animate: graphic === "high" })}
        src="https://png.pngtree.com/png-clipart/20220715/ourmid/pngtree-black-tree-png-image_5769376.png"
        alt=""
      />
    </div>
  )
}

export default Home

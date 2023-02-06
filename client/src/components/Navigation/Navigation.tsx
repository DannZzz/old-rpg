import React, { useEffect, useState } from "react"
import "./Navigation.scss"
import RPGLOGO from "../../assets/logo.png"
import Link from "../basic/Link/Link"
import { useTranslation } from "react-i18next"
import { FiSettings } from "react-icons/fi"
import { TbMusic, TbMusicOff } from "react-icons/tb"
import { FiVolume2, FiVolumeX } from "react-icons/fi"
import { MenuProps, Radio, Slider } from "antd"
import { Dropdown, Space } from "antd"
import ReactCountryFlag from "react-country-flag"
import { convertToCode } from "../../i18n/formatter"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  changeLanguage,
  closeDrawer,
  createModal,
  openDrawer,
  selectSettings,
  setGraphic,
  updateDrawerContent,
} from "../../features/settings/settings"
import Button from "../basic/Button/Button"
import { DrawerSettings } from "../../features/settings/Drawer/drawer"
import {
  changeGlobalSoundSettings,
  selectSound,
} from "../../features/sound/sound"
import { ModalSettings } from "../../features/settings/Modal/modal"
import AuthModalContent from "../AuthModalContent/AuthModalContent"
import { selectUser } from "../../features/user/user"
import Authorizated from "../Authorizated"

const Navigation = () => {
  const { t } = useTranslation()
  const { language, graphic } = useAppSelector(selectSettings)
  const { user } = useAppSelector(selectUser)
  const sound = useAppSelector(selectSound)
  const dispatch = useAppDispatch()
  const [tempLang, setTempLang] = useState(language)
  const [musicSlide, setMusicSlide] = useState(sound.globalMusic)
  const [soundSlide, setSoundSlide] = useState(sound.globalSound)
  const [graficType, setGraficType] = useState(graphic)

  function handleSettingsSave() {
    dispatch(closeDrawer())
    dispatch(changeLanguage(tempLang))
    dispatch(changeGlobalSoundSettings({ type: "music", amount: musicSlide }))
    dispatch(changeGlobalSoundSettings({ type: "sound", amount: soundSlide }))
    dispatch(setGraphic(graficType))
  }

  const graficOptions = [
    {
      label: t("settings.graphic.low"),
      value: "low",
    },
    {
      label: t("settings.graphic.high"),
      value: "high",
    },
  ]

  function onGraficChange(val) {
    setGraficType(val)
  }

  const items: MenuProps["items"] = [
    {
      label: <span>English</span>,
      key: "en",
      icon: <ReactCountryFlag countryCode="us" />,
      onClick: () => {
        setTempLang("en")
      },
    },
    {
      label: <span>Русский</span>,
      key: "ru",
      icon: <ReactCountryFlag countryCode="ru" />,
      onClick: () => {
        setTempLang("ru")
      },
    },
  ]

  const drawerOptions: DrawerSettings = {
    content: (
      <div className="settings-in-drawer">
        <div className="horizontal-icons">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <ReactCountryFlag
              style={{
                fontSize: "2em",
                lineHeight: "2em",
              }}
              className="nav-settings-icon clickable"
              countryCode={convertToCode(tempLang)}
            />
          </Dropdown>
          <div className="volume-sliders">
            <div className="nav-settings-container">
              {!musicSlide ? (
                <TbMusicOff className="nav-settings-icon" />
              ) : (
                <TbMusic className="nav-settings-icon" />
              )}
              <Slider
                className="slider"
                onChange={(n: number) => setMusicSlide(n)}
                min={0}
                max={100}
                defaultValue={musicSlide}
              />
            </div>
            <div className="nav-settings-container">
              {!soundSlide ? (
                <FiVolumeX className="nav-settings-icon" />
              ) : (
                <FiVolume2 className="nav-settings-icon" />
              )}
              <Slider
                onChange={(n: number) => setSoundSlide(n)}
                className="slider"
                min={0}
                max={100}
                defaultValue={soundSlide}
              />
            </div>
          </div>
        </div>
        <div className="graphic-settings">
          <span>{t("settings.graphic.title")}</span>
          <Radio.Group
            options={graficOptions}
            defaultValue={graficType}
            onChange={(e) => onGraficChange(e.target.value)}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
      </div>
    ),
    extra: (
      <Button onClick={handleSettingsSave} size="small" type="success">
        {t("settings.save-button")}
      </Button>
    ),
    placement: "right",
    title: t("settings.title"),
    onClose: () => dispatch(closeDrawer()),
  }

  const authSettings: ModalSettings = {
    id: "auth",
    children: <AuthModalContent />,
    footer: [],
    dispatch,
  }

  function handleAuth() {
    dispatch(createModal(authSettings))
  }

  useEffect(() => {
    setMusicSlide(sound.globalMusic)
  }, [sound.globalMusic])

  useEffect(() => {
    setSoundSlide(sound.globalSound)
  }, [sound.globalSound])

  useEffect(() => {
    setGraficType(graphic)
  }, [graphic])

  // update drawer
  useEffect(() => {
    dispatch(updateDrawerContent(drawerOptions))
  }, [tempLang, soundSlide, musicSlide, graficType])

  function openSettings() {
    dispatch(openDrawer(drawerOptions))
  }

  return (
    <div className="nav">
      <div className="nav-link logo">
        <Link to="/">
          <img src={RPGLOGO} />
        </Link>
      </div>
      <div className="nav-link">
        <Link to="/leaderboard">{t("navigation.leaderboard")}</Link>
      </div>
      <Authorizated
        or={
          <div onClick={handleAuth} className="nav-link">
            <Link border>{t("navigation.signin")}</Link>
          </div>
        }
      ></Authorizated>

      <div className="nav-right">
        <FiSettings
          className="nav-settings-icon clickable"
          onClick={openSettings}
        />
        {user && user.username}
      </div>
    </div>
  )
}

export default Navigation

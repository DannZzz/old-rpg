import React from "react"
import ReactSound from "react-sound"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { MusicKey, SoundKey, SoundName, stopMusic, stopSound } from "./sound"

const PageSound: React.FC<{ sound?: SoundKey; music?: MusicKey }> = ({
  sound,
  music,
}) => {
  const soundState = useAppSelector((state) => state.sound)

  const dispatch = useAppDispatch()

  const _sound = sound
    ? soundState.sounds[sound]
    : music
    ? soundState.musics[music]
    : null

  if (!_sound) return <></>

  const onFinishedPlaying = () => {
    _sound?.onFinish?.()
    if (sound) dispatch(stopSound(sound))
    else if (music) dispatch(stopMusic(music))
  }

  return (
    <ReactSound
      autoLoad
      {..._sound}
      playStatus={
        (!soundState.started && music) ||
        (sound && !soundState.globalSound) ||
        (music && !soundState.globalMusic)
          ? "STOPPED"
          : _sound.status
      }
      volume={percentOf(
        _sound.volume,
        sound ? soundState.globalSound : soundState.globalMusic
      )}
      url={`sounds/${_sound.fileName}`}
      onFinishedPlaying={onFinishedPlaying}
    />
  )
}

export default PageSound

function percentOf(sum: number, percent: number) {
  return Math.round((percent / 100) * sum)
}

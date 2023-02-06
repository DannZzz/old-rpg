import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type PlayStatus = "PLAYING" | "STOPPED" | "PAUSED"

interface SoundSettings {
  fileName: string
  status: PlayStatus
  volume: number
  loop?: true
  onFinish?: () => {}
}

export type MusicKey = "home"
export type SoundKey = "click"
export type SoundName = MusicKey | SoundKey

export interface SoundState {
  started: boolean
  globalMusic: number
  globalSound: number
  sounds: { [k in SoundKey]: SoundSettings }
  musics: { [k in MusicKey]: SoundSettings }
}

const initialState: SoundState = {
  started: false,
  globalMusic: 0,
  globalSound: 100,
  musics: {
    home: {
      volume: 50,
      status: "PLAYING",
      loop: true,
      fileName: "Life-Is-A-Game.mp3",
    },
  },
  sounds: {
    click: {
      volume: 15,
      status: "STOPPED",
      fileName: "click.wav",
    },
  },
}

const soundSlice = createSlice({
  name: "sound",
  initialState,
  reducers: {
    startSoundPlaying(state) {
      state.started = true
    },
    playSound(
      state,
      action: PayloadAction<{ name: SoundKey; options?: SoundSettings }>
    ) {
      state.sounds[action.payload.name].status = "PLAYING"
      if (action.payload.options)
        state.sounds[action.payload.name] = action.payload.options
    },
    stopSound(state, action: PayloadAction<SoundKey>) {
      state.sounds[action.payload].status = "STOPPED"
    },
    playMusic(
      state,
      action: PayloadAction<{ name: MusicKey; options?: SoundSettings }>
    ) {
      state.musics[action.payload.name].status = "PLAYING"
      if (action.payload.options)
        state.musics[action.payload.name] = action.payload.options
    },
    stopMusic(state, action: PayloadAction<MusicKey>) {
      state.musics[action.payload].status = "STOPPED"
    },
    changeGlobalSoundSettings(
      state,
      action: PayloadAction<{
        type: "music" | "sound"
        amount: number
        dontSave?: true
      }>
    ) {
      const { type, amount, dontSave = false } = action.payload
      if (type === "music") {
        state.globalMusic = amount
        if (!dontSave) localStorage.setItem("globalMusic", amount + "")
      } else if (type === "sound") {
        state.globalSound = amount
        if (!dontSave) localStorage.setItem("globalSound", amount + "")
      }
    },
    fromLocalStorage(state) {
      const music = localStorage.getItem("globalMusic")
      const sound = localStorage.getItem("globalSound")
      if (music && !isNaN(+music)) state.globalMusic = +music
      if (sound && !isNaN(+sound)) state.globalSound = +sound
    },
  },
})

export const selectSound = (state: any): SoundState => state.sound

export const {
  playMusic,
  stopMusic,
  playSound,
  stopSound,
  changeGlobalSoundSettings,
  fromLocalStorage,
  startSoundPlaying,
} = soundSlice.actions

export default soundSlice.reducer

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import i18next from "i18next"
import { DrawerSettings } from "./Drawer/drawer"
import { ModalSettings } from "./Modal/modal"

type GraphicType = "low" | "high"

interface SettingsState {
  drawer: DrawerSettings
  modals: ModalSettings[]
  language: string
  graphic: GraphicType
}

const initialState: SettingsState = {
  drawer: {},
  modals: [],
  language: localStorage.getItem("lng") || "en",
  graphic: (localStorage.getItem("graphic") as any) || "high",
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setGraphic(state, action: PayloadAction<GraphicType>) {
      state.graphic = action.payload
      localStorage.setItem("graphic", action.payload)
    },
    openDrawer(state, action: PayloadAction<DrawerSettings>) {
      state.drawer = action.payload
      state.drawer.open = true
    },
    updateDrawerContent(state, action: PayloadAction<DrawerSettings>) {
      state.drawer = { ...state.drawer, ...action.payload }
    },
    closeDrawer(state) {
      state.drawer.open = false
    },
    changeLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload
      i18next.changeLanguage(action.payload)
      localStorage.setItem("lng", action.payload)
    },
    createModal(state, action: PayloadAction<ModalSettings>) {
      const modal = action.payload
      modal.open = true
      const onCancel = { ...modal }.onCancel
      modal.onCancel = (e: any) => {
        onCancel?.(e)
        modal.dispatch(removeModal(modal.id))
      }
      let index = state.modals.findIndex((m) => m.id === modal.id)
      if (index === -1) index = state.modals.length as any
      ;(state.modals as any)[index] = modal
    },
    updateModal(state, action: PayloadAction<ModalSettings>) {
      const modal = action.payload
      let index = state.modals.findIndex((m) => m.id === modal.id)
      if (index === -1) return
      ;(state.modals as any)[index] = modal
    },
    removeModal(state, action: PayloadAction<string>) {
      state.modals = state.modals.filter((m) => m.id !== action.payload)
    },
  },
})

export const selectSettings = (state: any): SettingsState => state.settings
export const {
  setGraphic,
  openDrawer,
  closeDrawer,
  updateDrawerContent,
  changeLanguage,
  createModal,
  updateModal,
  removeModal,
} = settingsSlice.actions

export default settingsSlice.reducer

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import settings from "../features/settings/settings"
import sound from "../features/sound/sound"
import user from "../features/user/user"

export const store = configureStore({
  reducer: {
    settings: settings,
    sound: sound,
    user: user,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

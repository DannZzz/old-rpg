import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "../../app/store"
import useFetch from "../../hooks/useFetch"

interface UserState {
  token: string
  user: Game.User
}

const initialState: UserState = {
  token: null,
  user: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
      localStorage.setItem("token", action.payload)
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      console.log(action.payload)
      if (action.payload) {
        state.token = action.payload.token
        state.user = action.payload.data
      }
    })
  },
})

export const { setToken } = userSlice.actions

export const selectUser = (state: any) => state.user as UserState

export const fetchCurrentUser = createAsyncThunk<{
  data: Game.User
  token: string
}>("user/fetch", async (): Promise<any> => {
  const request = useFetch()
  try {
    const token = localStorage.getItem("token")
    const res = await request("/private/data/users", {
      query: { access_token: token },
    })
    return { token, data: res.data } as any
  } catch (e) {
    console.log(e)
    return null
  }
})

export default userSlice.reducer

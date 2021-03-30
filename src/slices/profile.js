import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const fetchUsernameByToken = createAsyncThunk(
  'profile/fetchByToken',
  async (token, thunkAPI) => {
    const response = await axios.get('https://api.spotify.com/v1/me',
      {headers: {"Authorization": `Bearer ${token}`}
    })
    return response.data;
  }

)
export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    username: null,
    token: null
  },
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload
    },
    updateToken: (state, action) => {
      state.token = action.payload
    },
  },
  extraReducers: {
    [fetchUsernameByToken.fulfilled]: (state, action) => {
      state.username = action.payload.display_name
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateUsername, updateToken } = profileSlice.actions

export default profileSlice.reducer
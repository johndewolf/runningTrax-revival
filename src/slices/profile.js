import { createSlice } from '@reduxjs/toolkit'

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    username: ''
  },
  reducers: {
    addUserName: (state, action) => {
      state.username = action.payload
    },
    removeUserName: state => {
      state.username = ''
    }
  }
})

// Action creators are generated for each case reducer function
export const { addUserName, removeUserName } = profileSlice.actions

export default profileSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

export const setsSlice = createSlice({
  name: 'sets',
  initialState: {
    sets: [],
    editingSet: 0,
  },
  reducers: {
    addSet: (state, action) => {
      state.sets.push(action.payload)
    },
  },

})

// Action creators are generated for each case reducer function
export const { addSet } = setsSlice.actions

export default setsSlice.reducer
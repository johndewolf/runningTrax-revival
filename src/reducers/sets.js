import { createSlice } from '@reduxjs/toolkit'

export const setsSlice = createSlice({
  name: 'sets',
  initialState: {
    list: [],
    editingSet: 0
  },
  reducers: {
    addSet: (state, action) => {
      state.editingSet++;
      state.list.push(action.payload)
    },
    addSetsFromPreset: (state, action) => {
      state.editingSet = action.payload.length;
      state.list = action.payload;
    },
    deleteSet: (state, action) => {
      state.editingSet = state.list.length ? state.list.length-- : 0;
      state.list = state.list.filter((set, index) => action.payload !== index)
    },
    updateSet: (state, action) => {
      state.list[action.payload.index] = action.payload.fieldValues
      state.editingSet = state.list.length;
    },
    updateEditingSet: (state, action) => {
      state.editingSet = action.payload;
    },
  },

})

export const { addSet, addSetsFromPreset, updateSet, deleteSet, updateEditingSet } = setsSlice.actions

export default setsSlice.reducer
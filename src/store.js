import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './reducers/profile'
import setsReducer from './reducers/sets'
import playlistReducer from './reducers/playlist'
export default configureStore({
  reducer: {
    profile: profileReducer,
    sets: setsReducer,
    playlist: playlistReducer
  }
})
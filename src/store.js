import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './reducers/profile'
import setsReducer from './reducers/sets'
export default configureStore({
  reducer: {
    profile: profileReducer,
    sets: setsReducer
  }
})
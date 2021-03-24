import React, {createContext, useReducer} from "react";

const initialState = {
    miles: [],
    editingMile: 0,
    token: null,
    username: null,
    playlist: []
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MILE':
      return {
        ...state,
        miles: [...state.miles, action.payload]
      }
    case 'UPDATE_MILE':
      let newState = {...state};
        newState.miles[action.payload.index] =  action.payload.values;
        return newState;  
    case 'UPDATE_CURRENT_MILE':
      return {
        ...state,
        editingMile: action.payload
      }
    case 'ADD_TOKEN':
      return {
        ...state,
        token: action.payload
      }
    case 'UPDATE_USERNAME' :
      return {
        ...state,
        username: action.payload
      }
    case 'ADD_PLAYLIST' :
      return {
        ...state,
        playlist: action.payload
      }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}
const Store = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;
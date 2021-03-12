import React, {createContext, useReducer} from "react";

const initialState = {
    miles: [],
    token: null
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MILE':
      return {
        ...state,
        miles: [...state.miles, action.payload]
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
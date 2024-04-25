import { IAuth, IAuthActions } from "./interface";

// Action types
export const ACTION_TYPE_ONE = "LOG-IN";
export const ACTION_TYPE_TWO = "LOG-OUT";

// Reducer function
const reducer = (state: IAuth, action: IAuthActions) => {
  switch (action.type) {
    case ACTION_TYPE_ONE:
      
      return {...state, ...action.payload}
    case ACTION_TYPE_TWO:
      return {...state, ...action.payload}
    default:
      return state;
  }
};

export default reducer;

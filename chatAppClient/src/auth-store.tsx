import React, { createContext, useEffect, useReducer } from "react";
import { IAuth, IAuthContext, ReactChildrenProps } from "./interface";
import reducer from "./reducers";

// Initial state

const DEFAULT_AUTH: IAuth = { email: "", isLoggedIn: false, _id: "" };

const DEFAULT_CONTEXT = {
  auth: DEFAULT_AUTH,
  sign_in: () => {},
  sign_out: () => {},
};

// Create context
const AuthContext = createContext<IAuthContext>(DEFAULT_CONTEXT);

export const AppProvider: React.FC<ReactChildrenProps> = ({ children }) => {
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      dispatch({ type: "LOG-IN", payload: JSON.parse(storedAuth) });
    }
  }, []);

  const sign_in = async (user: IAuth) => {
    localStorage.setItem("auth", JSON.stringify(user));
    dispatch({ type: "LOG-IN", payload: user });
  };

  const sign_out = async (user: IAuth) => {
    localStorage.removeItem("auth");
    dispatch({ type: "LOG-OUT", payload: user });
  };

  const [auth, dispatch] = useReducer(reducer, DEFAULT_AUTH);

  return (
    <AuthContext.Provider value={{ auth, sign_in, sign_out }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

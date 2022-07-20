import * as React from "react";
import fakeAuthProvider from "./fakeAuthProvider";
import AuthContext from "./AuthContext";

const AUTH_UUID_KEY = {
  key: "auth-key-uuid",
  value: process.env.REACT_APP_AUTH_KEY,
  password: process.env.REACT_APP_AUTH_PASSWORD,
};

function AuthProviderWrapper({ children }) {
  let [isAuthenticated, setIsAuthenticated] = React.useState(
    sessionStorage.getItem(AUTH_UUID_KEY.key) === AUTH_UUID_KEY.value
  );

  let signin = (password, callback, errorCallback) => {
    return fakeAuthProvider.signin(() => {
      if (password === AUTH_UUID_KEY.password) {
        sessionStorage.setItem(AUTH_UUID_KEY.key, AUTH_UUID_KEY.value);
        setIsAuthenticated(true);
        callback();
      } else {
        errorCallback("incorrect password");
      }
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      sessionStorage.setItem(AUTH_UUID_KEY.key, null);
      setIsAuthenticated(false);
      callback();
    });
  };

  let value = { isAuthenticated, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProviderWrapper;

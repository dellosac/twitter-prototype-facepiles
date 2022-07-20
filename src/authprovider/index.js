import * as React from "react";

import fakeAuthProvider from "./fakeAuthProvider";
import AuthProviderWrapper from "./AuthProviderWrapper";
import AuthContext from "./AuthContext";


function useAuth() {
  return React.useContext(AuthContext);
}

export { fakeAuthProvider, AuthProviderWrapper, useAuth };

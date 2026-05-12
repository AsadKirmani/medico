import React from "react";
import { Provider } from "react-redux";
import SignInDefault from "./components/SignIn";
import store from "store";

function SignIn() {

  return (
      <Provider store={store}>
        <SignInDefault />
      </Provider>
  );
}

export default SignIn;

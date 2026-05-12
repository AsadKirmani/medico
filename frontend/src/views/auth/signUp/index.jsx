import React from "react";
import { Provider } from "react-redux";
import SignUpDefault from "./components/SignUp";
import store from "store";

function SignUp() {

  return (
      <Provider store={store}>
        <SignUpDefault />
      </Provider>
  );
}

export default SignUp;

import React from "react";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";

function SignPage({ userState }) {
  const [, setUser] = userState;

  return (
    <div className="d-flex h-100">
      <div
        className="w-50 bg-primary text-white"
        style={{ position: "relative" }}
      >
        <div
          style={{
            width: "55%",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <SignIn setUser={setUser} />
        </div>
      </div>
      <div className="w-50" style={{ position: "relative" }}>
        <div
          style={{
            width: "60%",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <SignUp setUser={setUser} />
        </div>
      </div>
    </div>
  );
}

export default SignPage;

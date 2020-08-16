import React from "react";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";

function SignPage() {
  return (
    <div className="d-flex h-100">
      <div
        className="w-50 bg-primary text-white"
        style={{ position: "relative" }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <SignIn />
        </div>
      </div>
      <div className="w-50" style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <SignUp />
        </div>
      </div>
    </div>
  );
}

export default SignPage;

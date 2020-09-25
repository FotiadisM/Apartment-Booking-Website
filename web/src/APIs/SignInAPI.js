export const SignInAPI = (signInInfo) => {
  return fetch("https://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signInInfo),
  });
};

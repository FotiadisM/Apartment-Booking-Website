export const SignUpAPI = (signUpInfo) => {
  return fetch("https://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpInfo),
  });
};

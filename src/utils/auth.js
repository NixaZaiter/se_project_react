import { handleServerResponse } from "./constants";

const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

export const signupRequest = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) => {
    return handleServerResponse(res);
  });
};

export const loginRequest = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return handleServerResponse(res);
  });
};

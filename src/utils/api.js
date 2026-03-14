import { handleServerResponse } from "./index";

const baseUrl = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};

export const getClothes = () => {
  return fetch(`${baseUrl}/items`, {
    headers: headers,
  }).then((res) => {
    return handleServerResponse(res);
  });
};

export const addClothes = ({ name, link, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, link, weather }),
  }).then((res) => {
    return handleServerResponse(res);
  });
};

export const removeClothes = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: headers,
  }).then((res) => {
    return handleServerResponse(res);
  });
};

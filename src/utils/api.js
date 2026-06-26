import { handleServerResponse } from "./constants";

const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

export const getClothes = () => {
  return fetch(`${baseUrl}/items`, {
    headers: headers,
  }).then((res) => {
    return handleServerResponse(res);
  });
};

export const addClothes = ({ name, imageUrl, weather }, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => {
    return handleServerResponse(res);
  });
};

export const removeClothes = (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return handleServerResponse(res);
  });
};

export const apiKey = "45c25ad06bd3306e7c6da89db955b718";
export const coordinates = {
  latitude: 44.7426933,
  longitude: -92.8518697,
};

export function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

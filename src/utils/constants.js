export const apiKey =
  import.meta.env.VITE_OPENWEATHER_API_KEY ||
  "45c25ad06bd3306e7c6da89db955b718";
// coordinates intentionally removed so consumers receive undefined when not provided
export const coordinates = undefined;

export function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

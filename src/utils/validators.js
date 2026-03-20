export const validateAddItem = (vals) => {
  const next = { name: "", imageUrl: "", weather: "" };

  const name = (vals.name || "").trim();
  if (name.length < 2) next.name = "Name must be at least 2 characters.";
  else if (name.length > 15) next.name = "Name must be 15 characters or less.";

  try {
    const url = new URL((vals.imageUrl || "").trim());
    if (!["http:", "https:"].includes(url.protocol)) {
      next.imageUrl = "Image URL must use http or https.";
    }
  } catch {
    next.imageUrl = "Please enter a valid image URL.";
  }

  if (!["hot", "warm", "cold"].includes(vals.weather)) {
    next.weather = "Please select a weather type.";
  }

  return next;
};

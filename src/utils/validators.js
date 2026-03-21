export const validateAddItem = (vals) => {
  const next = { name: "", imageUrl: "", weather: "" };

  const name = (vals.name || "").trim();
  if (name.length < 2) next.name = "Name must be at least 2 characters.";
  else if (name.length > 15) next.name = "Name must be 15 characters or less.";

  const imageStr = (vals.imageUrl || "").trim();
  const isDataImage = imageStr.startsWith("data:image/");

  if (!imageStr) {
    next.imageUrl = "Please enter a valid image URL.";
  } else if (isDataImage) {
    // data:image/... accepted
  } else {
    try {
      const url = new URL(imageStr);
      if (!["http:", "https:"].includes(url.protocol)) {
        next.imageUrl = "Image URL must use http or https.";
      } else {
        // ensure URL looks like an image (common extensions). Accept query/hash after extension.
        const imageExtPattern = /\.(png|jpe?g|gif|webp|svg)(?:[?#].*)?$/i;
        if (
          !imageExtPattern.test(url.pathname) &&
          !imageExtPattern.test(url.href)
        ) {
          next.imageUrl =
            "Image URL must point to an image (png, jpg, gif, webp, svg).";
        }
      }
    } catch {
      next.imageUrl = "Please enter a valid image URL.";
    }
  }

  if (!["hot", "warm", "cold"].includes(vals.weather)) {
    next.weather = "Please select a weather type.";
  }

  return next;
};

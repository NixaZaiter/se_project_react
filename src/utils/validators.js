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

export const validateLogin = (vals) => {
  const next = { email: "", password: "" };

  const email = (vals.email || "").trim();
  if (!email) {
    next.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    next.email = "Email is invalid.";
  }

  const password = (vals.password || "").trim();
  if (!password) {
    next.password = "Password is required.";
  }
  return next;
};

export const validateSignup = (vals) => {
  const next = { email: "", password: "", name: "", avatarURL: "" };

  const email = (vals.email || "").trim();
  if (!email) {
    next.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    next.email = "Email is invalid.";
  }

  const password = (vals.password || "").trim();
  if (!password) {
    next.password = "Password is required.";
  } else if (password.length < 6) {
    next.password = "Password must be at least 6 characters.";
  }

  const name = (vals.name || "").trim();
  if (!name) {
    next.name = "Name is required.";
  } else if (name.length < 2) {
    next.name = "Name must be at least 2 characters.";
  } else if (name.length > 100) {
    next.name = "Name must be 100 characters or less.";
  }
  // must also check if valid image format
  const avatar = (vals.avatarURL || "").trim();
  if (!avatar) {
    next.avatarURL = "Avatar URL is required.";
  } else if (!/\S+\.\S+/.test(avatar)) {
    next.avatarURL = "Avatar URL is invalid.";
  } else {
    const validImageFormats = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
    const avatarExtension = avatar.split(".").pop();
    if (!validImageFormats.includes(avatarExtension)) {
      next.avatarURL =
        "Avatar URL must be a valid image format (jpg, jpeg, png, gif, webp, svg).";
    }
  }

  return next;
};

export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/weather/day/clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "cloudy",
    url: new URL("../assets/weather/day/cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../assets/weather/day/foggy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/weather/day/rain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/weather/day/snow.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "storm",
    url: new URL("../assets/weather/day/storm.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "clear",
    url: new URL("../assets/weather/night/clear-night.png", import.meta.url)
      .href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/weather/night/cloudy-night.png", import.meta.url)
      .href,
  },

  {
    day: false,
    condition: "fog",
    url: new URL("../assets/weather/night/foggy-night.png", import.meta.url)
      .href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/weather/night/rain-night.png", import.meta.url)
      .href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/weather/night/snow-night.png", import.meta.url)
      .href,
  },
  {
    day: false,
    condition: "storm",
    url: new URL("../assets/weather/night/storm-night.png", import.meta.url)
      .href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/weather/day/default.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/weather/night/default-night.png", import.meta.url)
      .href,
  },
};

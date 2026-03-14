import { handleServerResponse } from "./index";

export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  ).then((res) => {
    return handleServerResponse(res);
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    fahrenheit: data.main.temp,
    celsius: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.condition = data.weather[0].main.toLowerCase();
  result.type = getWeatherType(result.temp.fahrenheit);
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature >= 75) {
    return "hot";
  } else if (temperature >= 50 && temperature < 75) {
    return "warm";
  } else {
    return "cold";
  }
};

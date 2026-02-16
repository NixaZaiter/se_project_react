function processServerRequest(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  ).then((res) => {
    return processServerRequest(res);
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp };
  result.weather = { condition: data.weather[0].main };
  result.banner = getWeatherCondition(result.weather.condition);
  result.type = getWeatherType(result.temp.F);
  return result;
};

const getWeatherType = (temperature) => {
  if (temperature >= 75) {
    return "hot";
  } else if (temperature >= 55 && temperature < 75) {
    return "warm";
  } else {
    return "cold";
  }
};

const getWeatherCondition = (condition) => {
  if (condition === "Clear") {
    return "clear";
  } else if (condition === "Clouds") {
    return "cloudy";
  } else if (condition == ["Rain", "Drizzle"]) {
    return "rain";
  } else if (condition == ["Thunderstorm", "Squall", "Tornado"]) {
    return "storm";
  } else if (condition === "Snow") {
    return "snow";
  } else {
    return "fog";
  }
};

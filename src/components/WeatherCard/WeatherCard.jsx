import "./WeatherCard.css";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../utils/weatherItems.js";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <img
        className="weather-card__banner"
        src={weatherOption?.url}
        alt={weatherOption?.condition}
      />
      <p className="weather-card__temperature">
        {Math.ceil(weatherData.temp.fahrenheit)}°F
      </p>
    </section>
  );
}
export default WeatherCard;

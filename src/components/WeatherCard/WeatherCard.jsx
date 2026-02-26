import "./WeatherCard.css";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../utils/weatherItems.js";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
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
        {currentTemperatureUnit === "F"
          ? `${Math.ceil(weatherData.temp.fahrenheit)} °F`
          : `${Math.ceil(weatherData.temp.celsius)} °C`}
      </p>
    </section>
  );
}
export default WeatherCard;

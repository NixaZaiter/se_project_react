import "./WeatherCard.css";
import clear from "../../../../assets/weather/clear.png";
import cloudy from "../../../../assets/weather/cloudy.png";
import rain from "../../../../assets/weather/rain.png";
import storm from "../../../../assets/weather/storm.png";
import snow from "../../../../assets/weather/snow.png";
import fog from "../../../../assets/weather/foggy.png";
import nightClear from "../../../../assets/weather/clear-night.png";
import nightCloudy from "../../../../assets/weather/cloudy-night.png";
import nightRain from "../../../../assets/weather/rain-night.png";
import nightStorm from "../../../../assets/weather/storm-night.png";
import nightSnow from "../../../../assets/weather/snow-night.png";
import nightFog from "../../../../assets/weather/foggy-night.png";

const currentWeather = [clear, cloudy, rain, storm, snow, fog];

const currentNightWeather = [
  nightClear,
  nightCloudy,
  nightRain,
  nightStorm,
  nightSnow,
  nightFog,
];
const hours = new Date().getHours();
const isNight = hours > 19 || hours < 6;

function WeatherCard() {
  return (
    <div className="weather">
      <img
        className="weather__banner"
        src={!isNight ? currentWeather[0] : currentNightWeather[0]}
        alt="Weather bar"
      />
      <p className="weather__temperature">75°F</p>
    </div>
  );
}
export default WeatherCard;

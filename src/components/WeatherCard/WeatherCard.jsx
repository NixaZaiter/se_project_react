import "./WeatherCard.css";
import clear from "../../assets/weather/clear.png";
import cloudy from "../../assets/weather/cloudy.png";
import rain from "../../assets/weather/rain.png";
import storm from "../../assets/weather/storm.png";
import snow from "../../assets/weather/snow.png";
import fog from "../../assets/weather/foggy.png";
import nightClear from "../../assets/weather/clear-night.png";
import nightCloudy from "../../assets/weather/cloudy-night.png";
import nightRain from "../../assets/weather/rain-night.png";
import nightStorm from "../../assets/weather/storm-night.png";
import nightSnow from "../../assets/weather/snow-night.png";
import nightFog from "../../assets/weather/foggy-night.png";

const currentWeather = {
  clear: clear,
  cloudy: cloudy,
  rain: rain,
  storm: storm,
  snow: snow,
  fog: fog,
  night: {
    clear: nightClear,
    cloudy: nightCloudy,
    rain: nightRain,
    storm: nightStorm,
    snow: nightSnow,
    fog: nightFog,
  },
};

const hours = new Date().getHours();
const isNight = hours > 19 || hours < 6;

function WeatherCard({ weatherData }) {
  return (
    <section className="weather">
      <img
        className="weather__banner"
        src={
          !isNight
            ? currentWeather[weatherData.banner]
            : currentWeather.night[weatherData.banner]
        }
        alt="Weather bar"
      />
      <p className="weather__temperature">{Math.ceil(weatherData.temp.F)}°F</p>
    </section>
  );
}
export default WeatherCard;

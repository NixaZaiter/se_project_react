import "./Main.css";
import ItemCard from "./ItemCard/ItemCard";
import WeatherCard from "./WeatherCard/WeatherCard";

function Main() {
  return (
    <div className="main">
      <WeatherCard />
      <ItemCard />
    </div>
  );
}

export default Main;

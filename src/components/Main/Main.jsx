import { useContext } from "react";
import "./Main.css";

import { ItemCard, WeatherCard } from "../index";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

export default function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? `${Math.ceil(weatherData.temp.fahrenheit)} °F`
            : `${Math.ceil(weatherData.temp.celsius)} °C `}
          / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .toReversed()
            .filter((item) => item.weather === weatherData.type)
            .map((filteredItem) => {
              return (
                <ItemCard
                  key={filteredItem._id}
                  item={filteredItem}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

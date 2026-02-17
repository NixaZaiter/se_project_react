import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";

function Main({ weatherData, handleCardClick, clothingItems }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {Math.ceil(weatherData.temp.fahrenheit)}&deg; F / You may
          want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <li className="card" key={item._id}>
                  <ItemCard item={item} onCardClick={handleCardClick} />
                </li>
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;

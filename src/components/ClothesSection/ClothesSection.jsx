import "./ClothesSection.css";
import { ItemCard } from "../index";

export default function ClothesSection({
  weatherData,
  handleCardClick,
  clothingItems,
  onAddClick,
}) {
  return (
    <>
      <div className="clothes-section">
        <div className="clothes-section__row">
          <h3 className="clothes-section__text">Your items</h3>
          <button onClick={onAddClick} className="clothes-section__add-btn">
            + Add new
          </button>
        </div>
        <div className="clothes-section__container">
          <ul className="clothes-section__list">
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
        </div>
      </div>
    </>
  );
}

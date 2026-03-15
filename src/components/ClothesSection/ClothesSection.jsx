import "./ClothesSection.css";
import { ItemCard } from "../index";

export default function ClothesSection({
  handleCardClick,
  clothingItems,
  onAddClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <h3 className="clothes-section__text">Your items</h3>
        <button onClick={onAddClick} className="clothes-section__add-btn">
          + Add new
        </button>
      </div>
      <div className="clothes-section__container">
        <ul className="clothes-section__list">
          {clothingItems.toReversed().map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
